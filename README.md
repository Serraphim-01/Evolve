# Evolve - Authentication Documentation

This document outlines the process for user account creation and sign-in within the Evolve application.

## Account Creation (Sign Up)

There is one primary method for creating an account in Evolve: using a passkey.

### 1. Sign Up with a Passkey

This is the main, secure way to create your account. Passkeys are a new, passwordless authentication method that is both easier to use and more secure than traditional passwords.

**To create an account using a passkey:**

1.  Navigate to the [Sign Up page](/signup).
2.  Enter your desired **username** and **email address** in the respective fields.
3.  Click the "**Register with Passkey**" button.
4.  Your browser or operating system will prompt you to create a passkey. This might involve using your device's screen lock (like a fingerprint or face ID) or a physical security key.
5.  Follow the on-screen instructions to save the passkey.

Once completed, your account is created, and you are automatically logged in.

## Sign-In Methods

Once you have an account, you can sign in using one of two methods.

### 1. Sign In with a Passkey

This method allows you to sign in using the passkey you created during registration.

**To sign in with a passkey:**

1.  Navigate to the [Sign In page](/login).
2.  Enter the **email address** associated with your account.
3.  Click the "**Sign in with Passkey**" button.
4.  Your browser or operating system will prompt you to use your saved passkey.
5.  Authenticate using your device's security method (e.g., fingerprint, face ID).

You will then be securely logged into your account.

### 2. Sign In with Email Magic Link

This method allows you to sign in by clicking a special link sent to your email address.

**To sign in with a magic link:**

1.  Navigate to the [Sign In page](/login).
2.  Click the "**Sign in with Email Magic Link**" button.
3.  An email with a unique sign-in link will be sent to your registered email address.
4.  Open the email and click the link to be automatically logged in.

**Note:** This feature is currently implemented as a mock. In the current version, clicking the button will navigate you directly to the dashboard without sending an email. This is for demonstration purposes and will be replaced with a fully functional email-based authentication system.
