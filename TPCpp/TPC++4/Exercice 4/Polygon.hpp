#pragma once
#include "Point.h"
#include "vector.hpp"
class Polygon
{
private:
	Point* points;
	int nbrPoints;
public:
	Polygon(Point, Point, Point);
	Polygon(Point, Point, Point, Point);
	Polygon(Point, Point, Point, Point, Point);
	Polygon(int nbPoint, Point[]);

	float getArea();
	float getPerimeter();
	bool isConvex();
	bool isInside(Point p);
};

