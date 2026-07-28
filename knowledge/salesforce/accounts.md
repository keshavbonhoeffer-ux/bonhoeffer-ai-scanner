# BON AI - Salesforce Accounts Knowledge

## What is an Account?

An Account represents a customer, dealer, distributor, company, organization, or business entity.

Every customer that Bonhoeffer Machines works with should have an Account.

One Account can contain:

- Contacts
- Opportunities
- Visit Plans
- Activities
- Emails
- Meetings
- Customer History

--------------------------------------------------

# ACCOUNT INFORMATION

## Account Name

Stores the customer's business name.

Example:
Hindustan Suppliers

--------------------------------------------------

## Account Record Type

Defines the business category.

Possible values:

- Domestic
- International

--------------------------------------------------

## Type

Business classification of the customer.

--------------------------------------------------

## Website

Customer website.

--------------------------------------------------

## Phone

Primary company contact number.

--------------------------------------------------

## Active

Indicates whether the customer is currently active.

--------------------------------------------------

## Total Contacts

Shows how many Contacts belong to this Account.

--------------------------------------------------

## Customer Priority

Priority level assigned to the customer.

--------------------------------------------------

## RUC

Customer registration number (if applicable).

--------------------------------------------------

## Founded Year

Year the company was established.

--------------------------------------------------

## Account Type

Internal business category.

--------------------------------------------------

## GST No

Customer GST Number.

Example:

20AAGFH9364N1Z1

--------------------------------------------------

## Account Currency

Currency used for transactions.

Example:

INR - Indian Rupee

--------------------------------------------------

## Last Inventory Upload Date

Shows the latest inventory upload date.

--------------------------------------------------

## Account Owner

Salesperson responsible for this customer.

--------------------------------------------------

## SMS Opt Out

Whether SMS communication is disabled.

--------------------------------------------------

## Parent Account

Parent company if applicable.

--------------------------------------------------

## Industry

Customer industry.

--------------------------------------------------

## Employees

Number of employees.

--------------------------------------------------

## Annual Revenue / Total Import Value

Estimated annual revenue or import value.

--------------------------------------------------

## Brief About The Company

Short description of customer business.

--------------------------------------------------

## Description

Additional company information.

--------------------------------------------------

## Monthly Potential

Estimated monthly business value.

--------------------------------------------------

## Remarks

Salesperson notes regarding customer.

--------------------------------------------------

# ADDITIONAL INFORMATION

## Account Source

Source from which customer was created.

Example:

- Website
- Field Visit
- Dealer
- Referral
- Exhibition

--------------------------------------------------

## Payment Term

Customer payment agreement.

--------------------------------------------------

## Advance Percent (%)

Advance payment percentage.

--------------------------------------------------

## Balance Amount After Days

Number of days allowed before remaining payment.

--------------------------------------------------

## Account Lead Type

Lead category.

--------------------------------------------------

## Basis Of Price

Pricing basis agreed with customer.

--------------------------------------------------

## Remaining Balance Percent (%)

Remaining payment percentage.

--------------------------------------------------

# ADDRESS INFORMATION

## Billing Address

Customer billing address.

--------------------------------------------------

## Shipping Address

Customer shipping address.

--------------------------------------------------

## Number Of Locations

Total customer branches.

--------------------------------------------------

# SYSTEM INFORMATION

## Created By

Salesforce user who created the Account.

--------------------------------------------------

## Last Modified By

Salesforce user who last updated the Account.

--------------------------------------------------

# RELATED RECORDS

Every Account can contain multiple related records.

BON AI should understand these relationships.

--------------------------------------------------

## Contacts

One Account can have multiple Contacts.

Each Contact may include:

- Name
- Phone
- Mobile
- Email
- Designation

Example:

Narendra Agarwal

--------------------------------------------------

## Opportunities

One Account can contain multiple Opportunities.

Every Opportunity may include:

- Opportunity Name
- Stage
- Amount
- Close Date
- Salesperson

Example:

Hindustan Suppliers

Stage:
Closed Won

Amount:
INR 1,85,000

Close Date:
23/07/2026

--------------------------------------------------

## Visit Plans

Salespersons create Visit Plans for Accounts.

Visit Plans help track customer visits.

--------------------------------------------------

## Activities

Activities may include:

- Calls
- Meetings
- Emails
- Tasks
- Notes

--------------------------------------------------

## Conversation History

BON AI should understand that customer conversations may exist for an Account.

Conversation history helps understand previous discussions.

--------------------------------------------------

# BON AI RESPONSE RULES

When answering Account questions:

✔ Use only information available in Salesforce.

✔ Never invent values.

✔ Never assume missing information.

✔ If a field is blank, reply:

"This information is not available in the Account."

✔ When user asks about an Account, answer using:

1. Account Information
2. Related Contacts
3. Related Opportunities
4. Visit Plans
5. Activities
6. Address
7. Remarks

--------------------------------------------------

# EXAMPLES

Question:

Show customer phone number.

Answer:

Phone:
9334270006

--------------------------------------------------

Question:

Who owns this Account?

Answer:

Account Owner:
Anil Kumar Das

--------------------------------------------------

Question:

What is the GST Number?

Answer:

20AAGFH9364N1Z1

--------------------------------------------------

Question:

Show latest Opportunity.

Answer:

Opportunity:
Hindustan Suppliers

Stage:
Closed Won

Amount:
INR 1,85,000

Close Date:
23/07/2026

--------------------------------------------------

Question:

How many Contacts belong to this customer?

Answer:

This Account contains the Contacts listed under the Related Contacts section.

--------------------------------------------------

Question:

Show customer address.

Answer:

Billing Address:
Jharkhand, India

--------------------------------------------------

Question:

Show customer remarks.

Answer:

Display the value stored in the Remarks field.

--------------------------------------------------

Question:

Show customer activities.

Answer:

Display Activities such as:

- Calls
- Meetings
- Emails
- Tasks

in chronological order.