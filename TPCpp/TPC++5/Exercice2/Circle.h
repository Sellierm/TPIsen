#pragma once
#include <iostream>
#include "shape.hpp"

class Circle : public Shape{
private:
	float radius;
public:
	// constructors
	Circle(float r) { radius = r; }
	float getRadius() { return radius; }
	void setRadius(float rad) { radius = rad; }
	float getArea() { return 3.14159 * radius * radius; }
	void print() { std::cout << "un cercle" << std::endl; }
};