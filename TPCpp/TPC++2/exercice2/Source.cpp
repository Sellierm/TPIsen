#include <iostream>
#include <iomanip>
#define multiplier(x,y) (x*y)

int main(void) {
	//int a;
	//
	//std::cout << "Entrez une valeur: " << std::endl;
	//std::cin >> a;
	//
	//for (int i = 1; i < 10; i++) {
	//	std::cout << multiplier(a,i) <<std::endl;
	//}

	int a;
	for(a = 1; a<10 ;a++){
		std::cout << "\n\ntable de "<< a <<"\n"<< std::endl;
		for (int i = 1; i < 10; i++) {
			std::cout << a << " * " << i << ": " << std::setw(2);
			std::cout<< multiplier(a, i) << std::endl;
		}
	}
}