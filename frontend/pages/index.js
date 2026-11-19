import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Your AI-Powered <span className="text-blue-600">Health</span> Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fast, intelligent, and educational health insights. Always consult a real doctor for medical advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/symptoms" className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🩺</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Symptom Checker</h2>
            <p className="text-gray-500 leading-relaxed">Describe how you feel and receive a cautious AI assessment of potential conditions and next steps.</p>
          </Link>
          
          <Link href="/reports" className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">📄</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Report Summarizer</h2>
            <p className="text-gray-500 leading-relaxed">Upload a PDF medical report and get a plain-English summary of abnormal values and questions to ask your doctor.</p>
          </Link>
          
          <Link href="/recommendations" className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">💡</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Health Tips</h2>
            <p className="text-gray-500 leading-relaxed">Get personalized, non-prescriptive diet and lifestyle recommendations based on your basic health profile.</p>
          </Link>
        </div>

        <div className="mt-16 text-center text-sm text-gray-400">
          <p>⚠️ HealthOne is for educational purposes only and does not provide medical diagnoses or treatment.</p>
        </div>
      </main>
    </div>
  );
}