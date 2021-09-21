#pragma once
class Fraction{ 
private:
	int num; 
	int den; 
public:


	Fraction(int num = 0,int den = 1); 
	void print(); 
	void setNum(int num) { this->num = num; }
	void setDen(int den) { this->den = den; } 

	Fraction plus(const Fraction& other);
	Fraction minus(const Fraction& other);
	Fraction multiply(const Fraction& other);
	Fraction divide(const Fraction& other);

	Fraction plus(int i);
	Fraction minus(int i);
	Fraction multiply(int i);
	Fraction divide(int i);

	Fraction plusEqual(const Fraction& other);
	Fraction minusEqual(const Fraction& other);
	Fraction multiplyEqual(const Fraction& other);
	Fraction divideEqual(const Fraction& other);

	Fraction plusEqual(int i);
	Fraction minusEqual(int i);
	Fraction multiplyEqual(int i);
	Fraction divideEqual(int i);
	
	bool isEqual(const Fraction& other);
	bool isGreater(const Fraction& other);
	bool isSmaller(const Fraction& other);
	bool isGreaterEqual(const Fraction& other);
	bool isSmallerEqual(const Fraction& other);
	bool isDifferent(const Fraction& other);

	bool isEqual(int i);
	bool isGreater(int i);
	bool isSmaller(int i);
	bool isGreaterEqual(int i);
	bool isSmallerEqual(int i);
	bool isDifferent(int i);
};



