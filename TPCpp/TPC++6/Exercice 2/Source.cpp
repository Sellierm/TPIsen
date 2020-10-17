#include <iostream>
#include <vector>
#include <fstream>
#include "point.h"
using namespace std;

int main() {
	int nbrPoints = 0;
	vector<Point> nuage;

	int x = 0;
	int y = 0;
	char virgule;

	ifstream fichier("exo.txt", ios::beg);
	if (fichier) {
		while (fichier >> x >> virgule >> y) {
			nuage.push_back(Point(x, y));
			nbrPoints++;
		}
	}

	float Xall = 0, Yall = 0;
	for (int i = 0; i < nbrPoints; i++) {
		Xall += nuage[i].getX();
		Yall += nuage[i].getY();
	}
	Point g(Xall / nbrPoints, Yall / nbrPoints);
}