#include "vector.hpp"

vector::vector(Point point1, Point point2) {
	x = point2.getX() - point1.getX();
	y = point2.getY() - point1.getY();
}

vector::vector(float x1, float y1) {
	x = x1;
	y = y1;

}
void vector::setX(const float& newx) {
	x = newx;
}

void vector::setY(const float& newy) {
	y = newy;
}


vector vector::sum(vector vector2) {
	vector V = vector2;
	V.setX(V.getX() + x);
	V.setY(V.getY() + y);
	return V;
}


vector vector::multiply(float nbr){
	Point point1; Point point2;
	vector V(point1, point2);
	V.setX(nbr*x);
	V.setY(nbr*y);
	return V;
}




bool vector::IsVectorEqual(vector vector2){
	if (x == vector2.getX()) {
		if (y == vector2.getY()) {
		}
	}
	return false;
}

