#include <iostream>
#include <fstream>
#include <set>
#include "fraction.h"
using namespace std;


int main() {
	Fraction f1(10, 5);
	Fraction f2(3, 7);
	Fraction sum;
	set<Fraction> s = { f1,f2 };
	

	int num = 1;
	int den = 0;
	char slash;

	// Récupération des infos du fichier

	ifstream fichier("exo.txt", ios::beg);					
	if (fichier) {
		while (fichier >> num >> slash >> den) {  
			if (den * num > 0)						//vérifie que la fraction est positive
				s.insert(Fraction(num, den));		//et si oui l'ajoute au set
		}
	}

	// Parcour du set pour faire la somme et afficher chaque fraction
	
	set<Fraction>::iterator itr;
	for (itr = s.begin(); itr != s.end(); itr++) {	
		Fraction f3 = *itr;
		sum.plusEqual(f3);
		f3.print();
	}

	cout << "Somme des fractions : ";
	sum.simplify(100).print();

	cout << "\nValeur Minimum : ";
	
	Fraction tmp = *s.begin();			// obligé de faire ça(je sais pas pourquoi
	tmp.simplify(100).print();			//ça ne marchait pas de déréférencer s.begin() directement
	//*s.begin().simplify(100).print();

	cout << "\nValeur Maximum : ";
	tmp = *s.rbegin();					//pareil içi
	tmp.simplify(100).print();
	
}
