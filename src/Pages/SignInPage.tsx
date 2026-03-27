import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage: React.FC = () => {
    return (
        <div className="mx-auto flex max-w-md justify-center py-10">
            <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                forceRedirectUrl="/dashboard"
            />
        </div>
    );
};

export default SignInPage;