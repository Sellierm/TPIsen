#include <iostream>

class textrectangle {
	private: 
		int width;
		int height;
	public:
		void setWidth(int w) {
			width = w;
		}
		void setHeight(int h) {
			height = h;
		}

		textrectangle() {
			setHeight(4);
			setWidth(8);
		}

		int getArea() {
			return height * width;
		}

		int getPerimeter() {
			return height + width;
		}
		
		void print() {
			std::cout << "longeur : " << height << std::endl;
			std::cout << "largeur : " << width << std::endl;
			std::cout << "Aire : " << getArea() << std::endl;
			std::cout << "Perimetre : " << getPerimeter() << std::endl;
		}

		void drawArea(const char& pattern) {
			std::cout << std::endl;
			for (int i = 0; i < height; i++) {
				for (int j = 0; j < width; j++) {
					std::cout << (char)pattern;
				}
				std::cout << std::endl;
			}
		}

		void drawPerimeter(const char& pattern) {
			std::cout << std::endl;
			for (int i = 0; i < width; i++) {
				std::cout << (char)pattern;
			}
			std::cout << std::endl;

			for (int i = 1; i < height - 1; i++) {
				std::cout << (char)pattern;
				for (int j = 1; j < width - 1; j++) {
					std::cout << ' ';
				}
				std::cout << (char)pattern;
				std::cout << std::endl;
			}

			for (int i = 0; i < width; i++) {
				std::cout << (char)pattern;
			}
		}
};

int main(void) {
	textrectangle rectangle;
	rectangle.print();
	rectangle.drawArea('#');
	rectangle.drawPerimeter('*');
}