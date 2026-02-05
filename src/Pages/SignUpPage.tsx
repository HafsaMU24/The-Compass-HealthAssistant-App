import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
    return (
        <div className="mx-auto flex max-w-md justify-center py-10">
            <SignUp routing="path" path="/sign-up" />
        </div>
    );
};

export default SignUpPage;
