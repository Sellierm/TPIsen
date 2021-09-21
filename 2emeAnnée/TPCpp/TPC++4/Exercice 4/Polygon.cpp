#include <math.h>
#include <iostream>
#include "Polygon.hpp"
#include "Point.h"
#include "vector.hpp"
#include <tgmath.h>
using namespace std;
#define PI 3.14159265

Polygon::Polygon(Point A, Point B, Point C) : points(new Point[3]) {
	points[0] = A;
	points[1] = B;
	points[2] = C;
	nbrPoints = 3;
}

Polygon::Polygon(Point A, Point B, Point C, Point D): points(new Point[4]) {
	points[0] = A;
	points[1] = B;
	points[2] = C;
	points[3] = D;
	nbrPoints = 4;
}

Polygon::Polygon(Point A, Point B, Point C, Point D, Point E): points(new Point[5]) {
	points[0] = A;
	points[1] = B;
	points[2] = C;
	points[3] = D;
	points[4] = E;
	nbrPoints = 5;
}

Polygon::Polygon(int nbPoint, Point tab[]) : points(new Point[nbPoint]) {
	for (int i = 0; i < nbPoint; i++) {
		points[i] = tab[i];
	}
	nbrPoints = nbPoint;
}


float Polygon::getArea() {
	float sum = 0.;
	for (int i = 0; i < nbrPoints-1; i++) {
		sum += points[i+1].getX() * points[i ].getY() - points[i ].getX() * points[i + 1].getY();
	}
	return 0.5 * sum;
}

float Polygon::getPerimeter() {
	float perimeter = 0;
	for (int i = 0; i < nbrPoints - 1; i++) {
		perimeter += sqrt(pow(points[i + 1].getX() - points[i].getX(), 2) + pow(points[i].getY() - points[i + 1].getY(), 2));
	}
	perimeter += sqrt(pow(points[nbrPoints - 1].getX() - points[0].getX(), 2) + pow(points[nbrPoints - 1].getY() - points[0].getY(), 2));
	return perimeter;
}

bool Polygon::isConvex() {
	float* tab = new float[nbrPoints];
	float* tab2 = new float[nbrPoints];
	for (int i = 0; i < nbrPoints; i++) {
		float x1 = points[(i + 2) % nbrPoints].getX() - points[(i + 1) % nbrPoints].getX();
		float y1 = points[(i + 2) % nbrPoints].getY() - points[(i + 1) % nbrPoints].getY();
		float x2 = points[(i + 1) % nbrPoints].getX() - points[i].getX();
		float y2 = points[(i + 1) % nbrPoints].getY() - points[i].getY();
		tab[i] = x1 * y2 - x2 * y1;
		tab[i] = tab[i] / sqrt(pow(points[(i + 1) % nbrPoints].getX() - points[i].getX(), 2) + pow(points[i].getY() - points[(i + 1) % nbrPoints].getY(), 2));
		tab[i] = tab[i] / sqrt(pow(points[(i + 2) % nbrPoints].getX() - points[(i + 1) % nbrPoints].getX(), 2) + pow(points[(i + 1) % nbrPoints].getY() - points[(i + 2) % nbrPoints].getY(), 2));
		tab2[i] = asin(tab[i]);
		if (tab2[i] < 0 || tab[i] > PI) {
			cout << "Le polygone est concave" << endl;
			return false;
		}
	}
	cout << "Le polygone est convexe" << endl;
	return true;
}

bool Polygon::isInside(Point p) {
	float minX = points[0].getX();
	float maxX = points[0].getX();
	float minY = points[0].getY();
	float maxY = points[0].getY();

	for (int i = 1; i < nbrPoints; i++)
	{
		Point q = points[i];
		minX = fmin(q.getX(), minX);
		maxX = fmax(q.getX(), maxX);
		minY = fmin(q.getY(), minY);
		maxY = fmax(q.getY(), maxY);
	}
	if (p.getX() < minX || p.getX() > maxX || p.getY() < minY || p.getY() > maxY)
	{
		return false;
	}

	bool inside = false;

	for (int i = 0, j = nbrPoints - 1; i < nbrPoints; j = i++)
	{
		double a, b;
		if (points[(i + 1) % nbrPoints].getY() - points[i].getY() == 0) {
			if (p.getX() == points[i].getX() && p.getX() >= fmin(points[(i + 1) % nbrPoints].getX(), points[i].getX()) && p.getX() <= fmax(points[(i + 1) % nbrPoints].getX(), points[i].getX()))
				return true;

		}
		if (points[(i + 1) % nbrPoints].getX() - points[i].getX() == 0) {
			a = 0;
		}
		else {
			a = (points[(i + 1) % nbrPoints].getY() - points[i].getY()) / (points[(i + 1) % nbrPoints].getX() - points[i].getX());
		}
		b = points[i].getY() - a * points[i].getX();
		if (p.getY() == a * p.getX() + b && p.getX() >= fmin(points[(i + 1) % nbrPoints].getX(), points[i].getX()) && p.getX() <= fmax(points[(i + 1) % nbrPoints].getX(), points[i].getX()))
			return true;


		if ((points[i].getY() >= p.getY()) != (points[j].getY() >= p.getY()) &&
			p.getX() <= (points[j].getX() - points[i].getX()) * (p.getY() - points[i].getY()) / (points[j].getY() - points[i].getY()) + points[i].getX())
		{
			inside = !inside;
		}
	}
	return inside;
}

