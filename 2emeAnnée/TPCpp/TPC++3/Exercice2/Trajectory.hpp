#pragma once
#include "Point3D.h"


class Trajectory
{
private:
	int numberOfPoints;
	Point3D* points;
public:
	Trajectory(int nbr);
	void print();
	Point3D& getPoint(const int& n);
	float getTotalDistance();
	~Trajectory();
};

