#include <iostream>
#include <algorithm>
#include "Trajectory.hpp"
#include "Point3D.h";
using namespace std;


bool sortByPosition( Point3D& Point1, Point3D& Point2) { return Point1.getX() < Point2.getX(); }

Trajectory::Trajectory(int nbr):points(new Point3D[nbr]) {
	float x, y, z, t;
	numberOfPoints = nbr;
	x = (rand()) % 11;
	y = (rand()) % 11;
	z = (rand()) % 11;
	for (int i = 0; i < numberOfPoints; i++) {
		float t = static_cast <float> (rand()) / (static_cast <float> (RAND_MAX / 10));
		points[i].setXYZ(x *t, y *t, z *t);
	}
	sort(points, points + numberOfPoints, sortByPosition);
}



void Trajectory::print() {
	for (int i = 0; i < numberOfPoints; i++) {
		cout << "Point " << i + 1 << " : " << endl;
		points[i].Point3D::print();
	}
}

Point3D& Trajectory::getPoint(const int& n) {
	return points[n];
}

float Trajectory::getTotalDistance() {
	float distanceT = 0;
	int i;
	for (i = 0; i < numberOfPoints - 1; i++) {
		distanceT += points[i].distanceTo(points[i + 1]);
	}
	distanceT += points[0].distanceTo(points[numberOfPoints-1]);
	return distanceT;
}

Trajectory::~Trajectory() {
	delete[] points;
}