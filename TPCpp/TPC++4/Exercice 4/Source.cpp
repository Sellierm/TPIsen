#include "Point.h"
#include <iostream>
#include "Polygon.hpp"
using namespace std;

int main(){
	Point A(1, 1);
	Point B(2, 2);
	Point C(4, 2);
	Point D(3, 1);
	Point P(1.5, 1.5);
	Point test[4] = { A,B,C,D };
	
	Polygon poly(4, test);
	Polygon Quad(A,B,C,D);
	Polygon triangle(A, B, C);

	cout << triangle.getArea()<< endl;
	cout << Quad.getArea() << endl;
	cout << Quad.getPerimeter() << endl;
	cout << triangle.getPerimeter() << endl;
	cout << "\n\n\n";
	cout << Quad.isConvex()<< endl;
	cout << Quad.isInside(P);
}