import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const policyKey = 'PASSWORD-ACCESS-CONTROL';
  const existing = await prisma.policy.findFirst({
    where: { policyKey, status: 'PUBLISHED' }
  });

  if (existing) {
    console.log('PACP already exists.');
    return;
  }

  const content = `# Amra Leaf Password & Access Control Policy

## 1. Purpose
This policy defines the password, authentication, account access, and access control requirements for employees using Amra Leaf systems. Its purpose is to reduce unauthorized access, account compromise, password sharing, and misuse of company systems. This policy protects Amra Leaf systems and information from unauthorized access.

## 2. Scope
This policy applies to all employees and authorized users who access Amra Leaf systems, including:
- Cybersecurity portal
- POS systems
- Company computers
- Company email/accounts
- Internal systems
- Authorized staff devices

## 3. User Account Security
- Every employee must use their own account.
- Employees must not share accounts.
- Employees must not allow another person to use their credentials.
- Accounts must only be used for authorized business purposes.

## 4. Password Requirements
- Use strong passwords.
- Avoid easily guessed passwords.
- Do not use names, birthdays, phone numbers, or simple patterns.
- Do not reuse important personal passwords for company accounts.
- Passwords must be kept confidential.
- Never write passwords in publicly visible locations.

## 5. Multi-Factor Authentication (MFA)
Multi-Factor Authentication (MFA) should be used where supported. Employees must never share OTPs, verification codes, or authentication approvals with another person.

## 6. Password Sharing
Employees must never:
- Share passwords with coworkers.
- Send passwords through insecure messages.
- Give passwords to unknown persons.
- Provide credentials in response to suspicious emails, calls, or messages.

## 7. Access Control
Employees should only have access required for their job responsibilities.

**Principle of Least Privilege:**
Users should receive only the minimum system access necessary to perform their authorized work.

## 8. Administrator Access
Administrator accounts must have higher security protection because they can perform sensitive system operations. Administrative privileges must only be provided to authorized users.

## 9. Login Security
Employees must:
- Log out after using shared/workplace computers.
- Lock devices when leaving them unattended.
- Report suspicious login activity.
- Never attempt to access another employee's account.

## 10. Failed Login / Suspicious Access
Repeated failed login attempts or suspicious access should be treated as potential security events. Employees should report suspicious activity to the responsible administrator or management.

## 11. Employee Leaving or Account Deactivation
When an employee leaves Amra Leaf or no longer requires access, their account should be deactivated to prevent unauthorized access. This should align with the existing Employee Management feature where administrators can activate/deactivate employee accounts.

## 12. Security Awareness
Employees should complete relevant security awareness training, especially:
- Password Security & MFA
- Phishing Awareness
- Cybersecurity Basics

## 13. Policy Violations
Violations may result in:
- Warning
- Access restriction
- Account suspension/deactivation
- Further management action depending on severity

## 14. Policy Review
This policy should be reviewed at least annually or whenever significant security or system changes occur.

## 15. Employee Acknowledgement
By acknowledging this policy, you confirm that you have read, understood, and agree to follow the Password & Access Control Policy.`;

  await prisma.policy.create({
    data: {
      policyKey,
      title: 'Amra Leaf Password & Access Control Policy',
      category: 'Access Control',
      content,
      version: 'V1.0',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-10-05T00:00:00Z')
    }
  });

  console.log('Password & Access Control Policy successfully created and published!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
