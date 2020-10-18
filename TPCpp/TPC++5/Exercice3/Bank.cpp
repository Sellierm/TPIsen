#include "Bank.hpp"

BankAccount::BankAccount(int nb, string name, float bl) {
	balance = bl;
	owner = name;
	number = nb;
}


void BankAccount::deposit(float ammount) {
	this->balance += ammount;
}

bool  BankAccount::withdrawal(float ammount) {
	if (balance >= ammount) {
		balance -= ammount;
		return true;
	}
	else return false;
}


bool CheckingAccount::withdrawal(float ammount) {
	if (balance- ammount >= -overdraftLimit) {
		balance -= ammount;
		return true;
	}
	else return false;
}

bool CheckingAccount::transfer(float ammount ,BankAccount& otherBankAccount) {
	if (balance - ammount >= -overdraftLimit) {
		balance -= ammount;
		otherBankAccount.deposit(ammount);
		return true;
	}
	else return false;
}

SavingAccount::SavingAccount(int nb, string name, float bl, float rate) : BankAccount(nb, name, bl) { annualInterestRate = rate; }

void SavingAccount::depositeAnnualInterest(){
	balance += balance * annualInterestRate;
}


CheckingAccount::CheckingAccount(int nb, string name, float bl, float overDraft) : BankAccount(nb, name, bl) {overdraftLimit = overDraft;}

bool CheckingAccount::transfer(float ammount, BankAccount& otherBankAccount) {
	if (balance + overdraftLimit >= ammount) {
		balance -= ammount;
		otherBankAccount.balance += ammount;
		return true;
	}
	else return false;
}

bool CheckingAccount::withdrawal(float ammount) {
	if (balance + overdraftLimit >= ammount) {
		balance -= ammount;
		return true;
	}
	else return false;
}