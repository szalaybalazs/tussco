import { FunctionComponent } from "react";

interface iPrivacyPolicyProps {
  app?: string;
}

const PrivacyPolicy: FunctionComponent<iPrivacyPolicyProps> = ({
  app = "iOS App",
}) => {
  return (
    <div className="flex-1 px-8 max-w-4xl w-full mx-auto pt-16 text-lg font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-24">
      <h1 className="font-bold text-3xl text-gray-700 dark:text-gray-300">
        Privacy Policy for {app}
      </h1>
      <p className="mt-4">
        This privacy policy governs your use of the software application {app}{" "}
        (“Application”) for iOS devices that was created by Laszlo Tuss
        self-employed iOS developer. This privacy policy was last updated on Wed
        Oct 12 2022 20:14:56 GMT+0200 (Central European Summer Time). Our
        privacy policy may change from time to time for any reason. If we make
        any material changes to our policies, we will place a prominent notice
        on our website or application. If you have any questions or concerns
        about our privacy policies, feel free to contact me at any time.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        What information does the Application obtain and how is it used?
      </h2>
      <p className="mt-4">
        The Application does not collect or transmit any personally identifiable
        information about you, such as your name, address, phone number or email
        address.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        How do you handle location data?
      </h2>
      <p className="mt-4">
        The Application does not use or collect any data related to your
        geographic location.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        Can users see their personal data?
      </h2>
      <p className="mt-4">
        The Application itself does not collect, transmit, or maintain user
        data.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        Do you share personal information?
      </h2>
      <p className="mt-4">
        As no personal information is collected, transmitted, or maintained by
        the Application, we do not share personal information with anyone.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        Do advertising companies collect data?
      </h2>
      <p className="mt-4">
        The Application has no facility for collecting, transmitting, or
        maintaining user data, so no data is shared with advertising companies.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        Do you use vendors or analytics providers?
      </h2>
      <p className="mt-4">
        No. The Application has no facility for collecting, transmitting, or
        maintaining user data, so no data is shared with vendors or analytics
        providers.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        Do you comply with the Children&apos;s Online Privacy Protection Act
        (COPPA)?
      </h2>
      <p className="mt-4">
        Yes. We do not solicit nor gather any data from children under the age
        of 13. If a parent or guardian becomes aware that his or her child has
        provided us with information without their consent, he or she should
        contact me.
      </p>
      <h2 className="font-bold text-xl mt-8 text-gray-700 dark:text-gray-300">
        Contact Me
      </h2>
      If you have any questions about this Privacy Policy, please contact me:
      <ul className="list-disc">
        <li>
          By email:{" "}
          <a
            className="text-indigo-500 underline"
            href="mailto:laszlotuss@me.com"
          >
            laszlotuss@me.com
          </a>
        </li>
        <li>
          By visiting my website:{" "}
          <a className="text-indigo-500 underline" href="laszlotuss.com">
            laszlotuss.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
