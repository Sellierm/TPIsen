#pragma once
#include <iostream>
class Shape {
private:
	int id;
protected:
	int color; 
	int getId() { return id; }
public:
	int getColor() { return color; }
	void setColor(int c) { color = c; }
	virtual float getArea();
	void print() { std::cout << " une forme" << std::endl; }
};

