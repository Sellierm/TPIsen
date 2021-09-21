#pragma once
#include "shape.hpp"
class rectangle : public Shape
{
private:
	float L;
	float l;
public:
	rectangle(float lg, float lrg) {
		L = lg;
		l = lrg;
	}
	float getL() { return L; }
	float getl() { return l; }
	void setL(float longueur) { L = longueur; };
	void setl(float largeur) { l = largeur; };
	float getArea() { return L * l; }
	float getPerimeter() { return 2 * l + 2 * L; }
};

