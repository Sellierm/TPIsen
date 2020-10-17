#include <iostream>
#include <time.h>
#include "Point3D.h"
#include "vector.hpp"
using namespace std;

int main() {
	srand(time(NULL));
	Point3D P1; Point3D P2; Point3D P3; Point3D P4;
	vector V1(P1, P2);
	vector V2(P3, P4);	
	cout << V1.IsVectorEqual(V2) << endl;
	vector V3 = V1.sum(V2);
	vector V4 = V1.multiply(2.4);
}