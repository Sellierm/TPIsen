#include <iostream>
#include <random>
#include "Circle.hpp"
using namespace std;

Circle::Circle(float x, float y, float r) :center(x, y, 0), radius(r) {}

float Circle::getArea() {
	return radius * radius * MonteCarlo();
}

float Circle::getPerimeter() {
	return 2 * radius * MonteCarlo();
}


double MonteCarlo() {
	double x;
	double y;
	double Pi = 0;
	double p = 10000000;
	int nbrPoint = 0;
	for (int i = 0; i < p; i++) {
		x = ((double)rand() / (RAND_MAX));
		y = ((double)rand() / (RAND_MAX));
		if (x * x + y * y < 1) {
			nbrPoint++;
		}
	}
	Pi = nbrPoint * 4. / p;
	return Pi;
}