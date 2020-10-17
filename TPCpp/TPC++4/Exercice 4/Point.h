#pragma once
class Point
{
private : 
	float x, y;
public:
	Point();
	Point(const float& newx, const float& newy);

	void setXY(const float& newx, const float& newy);
	void setX(const float& newx);
	void setY(const float& newy);
	float getX() const ;
	float getY() const;
	void print();
	float distanceTo(const Point& otherPoint3D);
};

