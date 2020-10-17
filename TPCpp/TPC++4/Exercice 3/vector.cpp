#include "vector.hpp"

vector::vector(Point3D point1, Point3D point2) {
	x = point2.getX() - point1.getX();
	y = point2.getY() - point1.getY();
	z = point2.getZ() - point1.getZ();
}

void vector::setX(const float& newx) {
	x = newx;
}

void vector::setY(const float& newy) {
	y = newy;
}

void vector::setZ(const float& newz) {
	z = newz;
}

vector vector::sum(vector vector2) {
	vector V = vector2;
	V.setX(V.getX() + x);
	V.setY(V.getY() + y);
	V.setZ(V.getZ() + z);
	return V;
}


vector vector::multiply(float nbr){
	Point3D point1; Point3D point2;
	vector V(point1, point2);
	V.setX(nbr*x);
	V.setY(nbr*y);
	V.setZ(nbr*z);
	return V;
}




bool vector::IsVectorEqual(vector vector2){
	if (x == vector2.getX()) {
		if (y == vector2.getY()) {
			if (z == vector2.getZ()) {
				return true;
			}
		}
	}
	return false;
}

