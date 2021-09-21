#include <cstdlib>
#include <iostream>
#include "Point3D.h"
using namespace std;

Point3D::Point3D() {
	x = rand() % 101;
	y = rand() % 101;
	z = rand() % 101;
}

Point3D::Point3D(const float& newx, const float& newy, const float& newz) {
	x = newx;
	y = newy;
	z = newz;
}

void Point3D::setXYZ(const float& newx, const float& newy, const float& newz) {
	setX(newx);
	setY(newy);
	setZ(newz);
}


void Point3D::setX(const float& newx) {
	x = newx;
}

void Point3D::setY(const float& newy) {
	y = newy;
}

void Point3D::setZ(const float& newz) {
	z = newz;
}

float Point3D::getX()const {
	return x;
}

float Point3D::getY()const {
	return y;
}

float Point3D::getZ()const {
	return z;
}

void Point3D::print() {
	cout << " X = " << x << endl;
	cout << " Y = " << y << endl;
	cout << " Z = " << z << endl;
}

float Point3D::distanceTo(const Point3D& otherPoint3D) {
	return sqrt(pow(getX() - otherPoint3D.getX(), 2) + pow(getY() - otherPoint3D.getY(), 2) + pow(getZ() - otherPoint3D.getZ(), 2));
}