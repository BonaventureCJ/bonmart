import PageContainer from "@/components/layout/page-container";

export default function About() {
    return (
        <PageContainer>
            <h1 className="text-4xl font-bold mb-4">About BonMart</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                BonMart is building a bonzer shopping experience for everyone.
                Our new online store is under construction and will be live soon.
            </p>
        </PageContainer>
    );
}
