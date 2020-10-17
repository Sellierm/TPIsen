#include <cstdlib>
#include <iostream>
#include "Point3D.h"
using namespace std;

int main() {
	Point3D monPoint;
	monPoint.print();
	monPoint.setXYZ(16, 78, 33);
	cout << monPoint.getX() << endl;
	cout << monPoint.getY() << endl;
	cout << monPoint.getZ() << endl;
	
	Point3D autrePoint;
	autrePoint.print();
	cout << "distance = " << monPoint.distanceTo(autrePoint) << endl;;
}