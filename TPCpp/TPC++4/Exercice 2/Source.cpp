#include <iostream>
#include "Circle.hpp"

int main() {
	Circle cercle(1.354,7.43,3.);
	std::cout << cercle.getArea()<< std::endl;
	std::cout << cercle.getPerimeter() << std::endl;
}

