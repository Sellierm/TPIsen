#pragma once
#include "Point.h"
class vector
{
private:
	float x, y;
public:
	vector(Point point1, Point point2 );
	vector(float, float);
	float getX() { return x; };
	float getY() { return y; };
	void setX(const float& newx);
	void setY(const float& newy);
	vector sum(vector vector2);
	vector multiply(float nbr);
	bool IsVectorEqual(vector vector2);
};

