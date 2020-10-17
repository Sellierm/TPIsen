#pragma once
#include "Point3D.h"
class vector
{
private:
	float x, y, z;
public:
	vector(Point3D point1, Point3D point2 );
	float getX() { return x; };
	float getY() { return y; };
	float getZ() { return z; };
	void setX(const float& newx);
	void setY(const float& newy);
	void setZ(const float& newz);
	vector sum(vector vector2);
	vector multiply(float nbr);
	bool IsVectorEqual(vector vector2);
};

