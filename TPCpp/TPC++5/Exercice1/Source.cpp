#include <iostream>
using namespace std;

class A {
public : 
	A() { x = 0; cout << "1"; }
	A(int px) { x = px; cout << "2"; }
	A(const A& pa) { x = pa.x; cout << "3";}

protected:
	int x;
};

class B {
public:
	B(const A& pa = A()) : a(pa){ cout << "4"; }
	B(const A& pa, int py) { a = pa; y = py; cout << "5"; }
protected:
	A a;
	int y;
};

class C : public B {
public:
	C(int pz = 1) { z = pz;   cout << "6"; }
	C(A pa) : B(pa) { z = 0; cout << "7"; }
	C(const B& pb) : B(pb), a(1) { z = 0; cout << "8"; }
protected:
	A a;
	int z;
};


int main() {
	cout << "--A--\n";
	A a0; cout << endl;					// pas de paramètre de creation d'object :  Affiche 1;
	A a1(3); cout << endl;				// int en paramètre : Affiche 2
	A a2(a1);  cout << endl;			// un autre object en paramètre: affiche 3
	A a3 = a2; cout << endl;			// création d'un object identique que a2 et donc affiche la meme chose : 3
	a3 = a1; cout << endl;
	cout << "--B--\n";
	B b0(a0, 3); cout << endl;			// création d'un object avec comme paramètres un object A et un int : Va d'abord creer l'object A identique
										//a a0 donc affiche 1, puis va afficher la valeur correspondant à B() avec les memes paramètres soit 5

	B b1(a1); cout << endl;				// Création d'un object avec comme paramètre  a1. On aura donc l'object a qui sera créer avec comme paramètre un autre
										// object  et donc affiche 3, puis va afficher la valeur correspondant à B() avec les memes paramètres soit 4
	
	B b2; cout << endl;					//Création d'un object sans paramètre: Alors pa est créer sans paramètre et affiche 1. Ensuite l'object a  va etre 
										// créer avec comme parametre pa et va donc afficher 3. Ensuite, b2 va afficher 4;
	cout <<"\n--C--"<< endl;
	C c0; cout << endl;					// C = classe Mere; On appelle alors la classe B sans paramètre, qui appelle la classe A sans paramètre et qui créer deux objects A selon la methode
										//1 et 3. L'object B est ensuite créer selon la methode 4. Enfin, l'object de classe A situé dans la classe B 
										//est créé selon la methode 1. Enfin, l'object C est créé
	C c1(a1); cout << endl;					
	C c2(b2); cout << endl;

}