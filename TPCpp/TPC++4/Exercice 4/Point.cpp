#include <cstdlib>
#include <iostream>
#include "Point.h"
using namespace std;

Point::Point() {
	x = rand() % 101;
	y = rand() % 101;
}

Point::Point(const float& newx, const float& newy) {
	x = newx ; 
	y = newy;
}

void Point::setXY(const float& newx, const float& newy) {
	setX(newx);
	setY(newy);
}


void Point::setX(const float& newx){
	x = newx;
}

void Point::setY(const float& newy) {
	y = newy;
}


float Point::getX()const {
	return x;
}

float Point::getY()const {
	return y;
}


void Point::print() {
	cout << " X = " << x << endl;
	cout << " Y = " << y << endl;
}

float Point::distanceTo(const Point& otherPoint3D) {
	return sqrt(pow(getX() - otherPoint3D.getX(), 2) + pow(getY() - otherPoint3D.getY(), 2));
}