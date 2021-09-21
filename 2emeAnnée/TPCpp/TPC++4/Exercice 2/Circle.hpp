#pragma once
#include "Point.h"

class Circle
{
private : 
	Point center;
	float radius;

public:
	Circle(float, float, float);
	float getArea();
	float getPerimeter();

};

double MonteCarlo();