#include "Fraction.h"
#include <iostream>
#include <vector>
#include <fstream>
using namespace std;



int main() {
	int num = 1;
	int den = 0;
	char slash;
	Fraction f1(10, 5);
	Fraction f2(3, 7);
	vector<Fraction> V = { f1,f2 };

	

	ifstream fichier("exo.txt", ios::beg);
	if (fichier) {
		while (fichier >> num >> slash >> den) {
			V.push_back(Fraction(num, den));
		}
	}

	f1.plus(f2);
	f1.minus(f2);
	f1.multiply(f2);
	f1.divide(f2);

	f1.plus(2);
	f1.minus(2);
	f1.multiply(2);
	f1.divide(2);

	cout << f1.isEqual(f2) << endl;
	cout << f1.isSmaller(f2) << endl;
	cout << f1.isGreater(f2) << endl;
	cout << f1.isSmallerEqual(f2) << endl;
	cout << f1.isGreaterEqual(f2) << endl;
	cout << f1.isDifferent(f2) << endl;


	cout << f1.isEqual(2) << endl;
	cout << f1.isSmaller(2) << endl;
	cout << f1.isGreater(2) << endl;
	cout << f1.isSmallerEqual(2) << endl;
	cout << f1.isGreaterEqual(2) << endl;
	cout << f1.isDifferent(2) << endl;
}