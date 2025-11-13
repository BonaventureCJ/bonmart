import PageContainer from "@/components/layout/PageContainer";

export default function Contact() {
    return (
        <PageContainer>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                For inquiries or support, please reach out to us at{" "}
                <a
                    href="mailto:support@bonmart.com"
                    className="text-indigo-600 hover:underline"
                >
                    support@bonmart.com
                </a>
                .
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                You can also follow us on social media for updates and announcements.
            </p>
        </PageContainer>
    );
}
