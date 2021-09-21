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

int main() {
	cout << "--A--\n";
	A a0; cout << endl;					// pas de param�tre de creation d'object :  Affiche 1;
	A a1(3); cout << endl;				// int en param�tre : Affiche 2
	A a2(a1);  cout << endl;			// un autre object en param�tre: affiche 3
	A a3 = a2; cout << endl;			// cr�ation d'un object identique que a2 et donc affiche la meme chose : 3
	a3 = a1; cout << endl;
	cout << "--B--\n";
	B b0(a0, 3); cout << endl;			// cr�ation d'un object avec comme param�tres un object A et un int : Va d'abord creer l'object A identique
										//a a0 donc affiche 1, puis va afficher la valeur correspondant � B() avec les memes param�tres soit 5

	B b1(a1); cout << endl;				// Cr�ation d'un object avec comme param�tre  a1. On aura donc l'object a qui sera cr�er avec comme param�tre un autre
										// object  et donc affiche 3, puis va afficher la valeur correspondant � B() avec les memes param�tres soit 4
	
	B b2; cout << endl;					//Cr�ation d'un object sans param�tre: Alors pa est cr�er sans param�tre et affiche 1. Ensuite l'object a  va etre 
										// cr�er avec comme parametre pa et va donc afficher 3. Ensuite, b2 va afficher 4;
}