#include "Fraction.h"
#include <iostream>
using namespace std;

void Fraction::print() { cout << num << "/" << den << endl; }


Fraction::Fraction(int num, int den) { 
	cout << "Fraction(int,int)builds  " << num << "/" << den << endl; 
	setNum(num); 
	setDen(den); 
}

Fraction Fraction::plus(const Fraction& other) { 
	return Fraction(this->num * other.den + this->den * other.num, this->den * other.den); 
}

Fraction Fraction::minus(const Fraction& other) {
	return Fraction(this->num * other.den - this->den * other.num, this->den * other.den);
}

Fraction Fraction::multiply(const Fraction& other) {
	return Fraction(this->num * other.num, this->den * other.den);
}

Fraction Fraction::divide(const Fraction& other) {
	return Fraction(this->num * other.den, this->den * other.num);
}


Fraction Fraction::plus( int i) {
	return Fraction(this->num + this->den * i, this->den );
}


Fraction Fraction::minus(int i) {
	return Fraction(this->num - this->den * i, this->den);
}

Fraction Fraction::multiply(int i) {
	return Fraction(this->num * i, this->den);
}

Fraction Fraction::divide(int i) {
	return Fraction(this->num , this->den * i);
}



Fraction Fraction::plusEqual(const Fraction& other) {
	this->num = this->num * other.den + this->den * other.num;
	this->den = this->den * other.den;
	return *this;
}

Fraction Fraction::minusEqual(const Fraction& other) {
	this->num = this->num * other.den - this->den * other.num;
	this->den = this->den * other.den;
	return *this;
}

Fraction Fraction::multiplyEqual(const Fraction& other) {
	this->num = this->num * other.num;
	this->den = this->den * other.den;
	return *this;
}

Fraction Fraction::divideEqual(const Fraction& other) {
	this->num = this->num * other.den;
	this->den = this->den * other.num;
	return *this;
}


Fraction Fraction::plusEqual(int i) {
	this->num = this->num + this->den * i;
	return *this;
}


Fraction Fraction::minusEqual(int i) {
	this->num = this->num - this->den * i;
	return *this;
}

Fraction Fraction::multiplyEqual(int i) {
	this->num = this->num * i;
	return *this;
}

Fraction Fraction::divideEqual(int i) {
	this->den = this->den * i;
	return *this;
}


bool Fraction::isEqual(const Fraction& other) {
	if (this->num * other.den == other.num * this->den) {
		return true;
	}
	return false;
}

bool Fraction::isGreater(const Fraction& other) {
	if (this->num * other.den > other.num*this->den) {
		return true;
	}
}


bool Fraction::isSmaller(const Fraction& other) {
	if (this->num * other.den < other.num * this->den) {
		return true;
	}
	return false;
}

bool Fraction::isGreaterEqual(const Fraction& other) {
	if (this->num * other.den >= other.num * this->den) {
		return true;
	}
	return false;
}

bool Fraction::isSmallerEqual(const Fraction& other) {
	if (this->num * other.den <= other.num * this->den) {
		return true;
	}
	return false;
}

bool Fraction::isDifferent(const Fraction& other) {
	if (this->num * other.den == other.num * this->den) {
		return false;
	}
	return true;
}



bool Fraction::isEqual(int i) {
	if((float)(this->num) / (float)(this->den) == i) {
		return true;
	}
	return false;
}

bool Fraction::isGreater(int i) {
	if ((float)(this->num) / (float)(this->den) > i) {
		return true;
	}
	return false;
}

bool Fraction::isSmaller(int i) {
	if ((float)(this->num) / (float)(this->den) < i) {
		return true;
	}
	return false;
}

bool Fraction::isGreaterEqual(int i) {
	if ((float)(this->num) / (float)(this->den) >= i) {
		return true;
	}
	return false;
}

bool Fraction::isSmallerEqual(int i) {
	if ((float)(this->num) / (float)(this->den) <= i) {
		return true;
	}
	return false;
}

bool Fraction::isDifferent(int i) {
	if ((float)(this->num) / (float)(this->den) != i) {
		return true;
	}
	return false;
}
