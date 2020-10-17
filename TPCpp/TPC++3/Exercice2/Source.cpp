#include <cstdlib>
#include <time.h>
#include <iostream>
#include "Point3D.h"
#include "Trajectory.hpp"


int main() {
	srand(time(NULL));
	Trajectory traj(50);
	traj.print();
	std::cout << traj.getTotalDistance();
}