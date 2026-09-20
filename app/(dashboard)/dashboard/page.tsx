'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import { Loader2, FileText } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getYearOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
}

function DashboardContent() {
  const { data: session } = useSession();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportMessage, setReportMessage] = useState('');

  const username = session?.user?.email?.split('@')[0] || 'User';
  const isFormComplete = selectedMonth !== '' && selectedYear !== '';

  async function handleGenerateReport() {
    if (!isFormComplete) return;
    setIsGenerating(true);
    setReportMessage('');

    // TODO: Replace with actual API call when provided
    // const response = await fetch(`/api/report?month=${selectedMonth}&year=${selectedYear}`);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay

    setReportMessage('Report API not configured yet. Please provide the API endpoint.');
    setIsGenerating(false);
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      {/* Welcome message */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
        Welcome {username}
      </h1>

      {/* Report Generation */}
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Month dropdown */}
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select month</option>
                {MONTHS.map((month, index) => (
                  <option key={month} value={String(index + 1)}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Year dropdown */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select year</option>
                {getYearOptions().map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate button — disabled until both month and year are selected */}
            <Button
              onClick={handleGenerateReport}
              disabled={!isFormComplete || isGenerating}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </Button>

            {/* Status message */}
            {reportMessage && (
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                {reportMessage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex-1 p-4 lg:p-8"><p>Loading...</p></div>}>
      <DashboardContent />
    </Suspense>
  );
}
