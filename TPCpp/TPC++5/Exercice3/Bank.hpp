#pragma once
#include <string>
using namespace std;

class BankAccount
{
protected:
	int number;
	string owner;
	float balance;
public:
	BankAccount(int,string,float);
	void deposit(float);
	virtual bool withdrawal(float);
};

class CheckingAccount : protected BankAccount
{
private:
	float overdraftLimit;
public:
	bool withdrawal(float);
	bool transfer(float, BankAccount&);
};



class SavingAccount: protected BankAccount
{
private:
	float annualInterestRate;
public:
	SavingAccount(int nb, string name, float bl, float rate);
	void depositeAnnualInterest();
};