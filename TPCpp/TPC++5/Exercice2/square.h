#pragma once
#include "shape.hpp"
class square : public Shape
{
private:

	float L;
public:
	square(float l){
		L = l;
	}
	float getL() { return L; }
	void setL(float longueur) { L = longueur; };
	float getArea() { return L * L; }
	float getPerimeter() { return 4 * L; }
};

