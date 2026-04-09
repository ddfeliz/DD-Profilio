import { Metadata } from 'next';
import './portfolio.css';

export const metadata: Metadata = {
  title: 'i-Portfolio : Sambatra Tahirindrazana',
  description: 'Interactive portfolio for Sambatra Tahirindrazana. Full-stack Engineer specializing in high-performance synthetic interfaces and distributed architectures.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
