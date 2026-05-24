import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Download, User, Mail, Phone, ShieldCheck, 
  GraduationCap, Eye, CreditCard, CheckCircle, Calendar, 
  Printer, X, Smartphone, Wallet, FileText 
} from "lucide-react";

/* =========================================================================
   1. MOCK DATA (From paymentData.js)
   ========================================================================= */

const studentInfo = {
  name: "S. Nath",
  fullName: "S. Nath (Student)", 
  enrollmentNo: "12024001001",
  registrationNo: "2023001122",
  phone: "+91 98765 43210",
  email: "snath.student@college.edu", 
  course: "B.Tech - Computer Science",
  batch: "2023 - 2027"
};

const paymentStats = {
  totalCourseFee: "6,80,000", 
  totalPaid: "4,25,000",      
  completionPercentage: 62.5
};

const semesterFees = [
  {
    id: "SEM_01", semester: "1st Semester", tuitionFee: "85,000", busFee: "0", hostelFee: "0", fine: "0",
    dueDate: "10-Jul-2023", status: "PAID", paidOn: "08-Jul-2023", receiptId: "RCPT_1001", transactionId: "TXN_8821901"
  },
  {
    id: "SEM_02", semester: "2nd Semester", tuitionFee: "85,000", busFee: "0", hostelFee: "0", fine: "0",
    dueDate: "10-Jan-2024", status: "PAID", paidOn: "05-Jan-2024", receiptId: "RCPT_1002", transactionId: "TXN_8821902"
  },
  {
    id: "SEM_03", semester: "3rd Semester", tuitionFee: "85,000", busFee: "5,000", hostelFee: "0", fine: "0",
    dueDate: "10-Jul-2024", status: "PAID", paidOn: "12-Jul-2024", receiptId: "RCPT_1003", transactionId: "TXN_8821903"
  },
  {
    id: "SEM_04", semester: "4th Semester", tuitionFee: "85,000", busFee: "0", hostelFee: "0", fine: "150",
    dueDate: "10-Jan-2025", status: "PAID", paidOn: "15-Jan-2025", receiptId: "RCPT_1004", transactionId: "TXN_8821904"
  },
  {
    id: "SEM_05", semester: "5th Semester", tuitionFee: "85,000", busFee: "5,000", hostelFee: "0", fine: "0",
    dueDate: "10-Jul-2025", status: "PAID", paidOn: "05-Jul-2025", receiptId: "RCPT_1005", transactionId: "TXN_8821905"
  },
  {
    id: "SEM_06", semester: "6th Semester", tuitionFee: "85,000", busFee: "0", hostelFee: "0", fine: "0",
    dueDate: "10-Jan-2026", status: "DUE", paidOn: null, receiptId: null, transactionId: null
  },
  {
    id: "SEM_07", semester: "7th Semester", tuitionFee: "85,000", busFee: "0", hostelFee: "0", fine: "0",
    dueDate: "10-Jul-2026", status: "UPCOMING", paidOn: null, receiptId: null, transactionId: null
  },
  {
    id: "SEM_08", semester: "8th Semester", tuitionFee: "85,000", busFee: "0", hostelFee: "0", fine: "0",
    dueDate: "10-Jan-2027", status: "UPCOMING", paidOn: null, receiptId: null, transactionId: null
  }
];

/* =========================================================================
   2. SUB-COMPONENTS
   ========================================================================= */

// --- 2.1 Profile & Progress Card ---
const PaymentProfileCard = () => (
  <div className="space-y-6 no-print">
    <div className="group relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-[2rem] p-6 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-40"></div>
          <div className="relative w-24 h-24 rounded-full bg-[#12141d] border-2 border-gray-700 p-1 flex items-center justify-center">
             <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" alt="Profile" className="w-full h-full object-cover grayscale contrast-125" />
             </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full border-2 border-[#12141d] shadow-lg">
             <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">{studentInfo.name}</h2>
        <p className="text-sm text-blue-400 font-medium mb-4">{studentInfo.course}</p>
        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-gray-800">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 font-mono">{studentInfo.enrollmentNo}</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-gray-800">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 truncate">{studentInfo.email}</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-gray-800">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 font-mono">{studentInfo.phone}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
       <h3 className="text-sm font-bold text-indigo-200 mb-4 flex items-center gap-2">
        <GraduationCap className="w-4 h-4" /> Fee Progress
      </h3>
      <div className="flex justify-between items-end mb-2">
        <span className="text-3xl font-bold text-white">{paymentStats.completionPercentage}%</span>
        <span className="text-xs text-indigo-300 mb-1">Complete</span>
      </div>
      <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${paymentStats.completionPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
        <div><p className="uppercase text-[10px] font-bold text-indigo-400/50 mb-1">Paid</p><p className="font-mono text-white">₹{paymentStats.totalPaid}</p></div>
        <div className="text-right"><p className="uppercase text-[10px] font-bold text-indigo-400/50 mb-1">Total</p><p className="font-mono text-white">₹{paymentStats.totalCourseFee}</p></div>
      </div>
    </div>
  </div>
);

// --- 2.2 Fee Ledger Table (Corrected with all original columns) ---
const FeeLedgerTable = ({ onPay, onViewReceipt, onPrintReceipt }) => (
  <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/60 rounded-3xl overflow-hidden shadow-2xl no-print">
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800/50 border-b border-gray-700/50 text-xs uppercase tracking-wider text-gray-400">
            <th className="p-5 font-bold whitespace-nowrap">Semester</th>
            <th className="p-5 font-medium whitespace-nowrap">Sem Fees</th>
            <th className="p-5 font-medium whitespace-nowrap">Bus Fare</th>
            <th className="p-5 font-medium whitespace-nowrap">Hostel</th>
            <th className="p-5 font-medium whitespace-nowrap text-red-400">Late Fine</th>
            <th className="p-5 font-medium whitespace-nowrap">Due Date</th>
            <th className="p-5 font-medium text-center whitespace-nowrap">Action</th>
            <th className="p-5 font-medium text-center whitespace-nowrap">Receipt</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {semesterFees.map((row, index) => {
            const isPaid = row.status === 'PAID';
            const isDue = row.status === 'DUE';
            
            return (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                key={row.id} 
                className={`transition-colors ${isPaid ? 'hover:bg-green-900/10' : isDue ? 'bg-blue-900/10 hover:bg-blue-900/20' : 'hover:bg-gray-800/30'}`}
              >
                <td className="p-5">
                  <p className={`font-bold text-sm ${isPaid ? 'text-gray-300' : isDue ? 'text-blue-400' : 'text-gray-500'}`}>{row.semester}</p>
                  {isPaid && <p className="text-[10px] text-green-400 flex items-center gap-1 mt-1 font-mono"><CheckCircle className="w-3 h-3"/> Paid on {row.paidOn}</p>}
                </td>
                <td className={`p-5 font-mono text-sm ${isPaid ? 'text-gray-300' : isDue ? 'text-white font-bold' : 'text-gray-600'}`}>₹{row.tuitionFee}</td>
                <td className={`p-5 font-mono text-sm ${row.busFee !== "0" ? 'text-orange-300' : 'text-gray-600'}`}>₹{row.busFee}</td>
                <td className={`p-5 font-mono text-sm ${row.hostelFee !== "0" ? 'text-orange-300' : 'text-gray-600'}`}>₹{row.hostelFee}</td>
                <td className={`p-5 font-mono text-sm ${row.fine !== "0" ? 'text-red-400 font-bold' : 'text-gray-600'}`}>₹{row.fine}</td>
                <td className="p-5">
                  <div className={`flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full w-fit ${isPaid ? 'bg-gray-800/50 text-gray-500' : isDue ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-gray-800/50 text-gray-500'}`}>
                    <Calendar className="w-3 h-3" /> {row.dueDate}
                  </div>
                </td>
                <td className="p-5 text-center">
                  {isPaid ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">Paid</span>
                  ) : row.status === 'UPCOMING' ? (
                    <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Locked</span>
                  ) : (
                    <button onClick={() => onPay(row)} className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20">
                      <CreditCard className="w-4 h-4" /> Pay Now
                    </button>
                  )}
                </td>
                <td className="p-5 text-center">
                  {isPaid ? (
                    <div className="flex justify-center gap-2">
                      <button onClick={(e) => onViewReceipt(row, e)} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-blue-400 border border-gray-700 transition-colors" title="View Digital Receipt">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onPrintReceipt(row)} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-colors" title="Print PDF">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-8 h-1 mx-auto bg-gray-800 rounded-full" /> 
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// --- 2.3 Modals ---
const SimpleModal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm no-print" onClick={onClose} />
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="relative z-10 w-full max-w-md">
      {children}
    </motion.div>
  </div>
);

const PaymentGatewayModal = ({ semester, onClose }) => {
  if (!semester) return null;
  const totalDue = parseInt(semester.tuitionFee.replace(/,/g, '')) + parseInt(semester.hostelFee.replace(/,/g, '')) + parseInt(semester.busFee.replace(/,/g, '')) + parseInt(semester.fine.replace(/,/g, ''));

  return (
    <div className="w-full h-full flex flex-col"> 
      <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-gray-900/50">
        <div>
          <h3 className="text-xl font-bold text-white">Payment Gateway</h3>
          <p className="text-gray-400 text-sm mt-1">Completing payment for <span className="text-blue-400">{semester.semester}</span></p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-6 text-center bg-blue-600/5 border-b border-gray-800">
        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Total Payable Amount</p>
        <div className="text-4xl font-bold text-white">₹{totalDue.toLocaleString()}</div>
      </div>
      <div className="p-6 space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Payment Method</p>
        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Smartphone className="w-5 h-5" /></div>
            <div className="text-left"><p className="text-sm font-bold text-gray-200 group-hover:text-white">UPI / QR Code</p><p className="text-xs text-gray-500">GooglePay, PhonePe</p></div>
          </div>
          <div className="w-4 h-4 rounded-full border border-gray-600 group-hover:border-blue-500" />
        </button>
        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><CreditCard className="w-5 h-5" /></div>
            <div className="text-left"><p className="text-sm font-bold text-gray-200 group-hover:text-white">Credit / Debit Card</p><p className="text-xs text-gray-500">Visa, Mastercard</p></div>
          </div>
          <div className="w-4 h-4 rounded-full border border-gray-600 group-hover:border-blue-500" />
        </button>
      </div>
      <div className="p-6 bg-gray-900/50 border-t border-gray-800">
        <button onClick={() => { alert('Payment Gateway Integration Pending'); onClose(); }} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-colors">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

const ReceiptModal = ({ receipt, onClose, onPrint }) => {
  if (!receipt) return null;
  const totalPaid = parseInt(receipt.tuitionFee.replace(/,/g, '')) + parseInt(receipt.hostelFee.replace(/,/g, '')) + parseInt(receipt.busFee.replace(/,/g, '')) + parseInt(receipt.fine.replace(/,/g, ''));

  return (
    <div className="w-full h-full relative flex flex-col bg-white text-gray-900 rounded-lg printable-receipt">
      <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors z-10 no-print">
        <X className="w-6 h-6 text-gray-500" />
      </button>
      
      <div id="receipt-print-area" className="p-8 pb-4">
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="w-6 h-6 text-gray-800" />
            <h2 className="text-xl font-extrabold tracking-wide uppercase">Official Receipt</h2>
          </div>
          <p className="text-sm text-gray-500">Institute of Engineering & Management</p>
        </div>

        <div className="flex justify-between text-xs mb-6">
          <div className="space-y-1">
            <p><span className="font-bold text-gray-500">STUDENT:</span> {studentInfo.fullName}</p>
            <p><span className="font-bold text-gray-500">ENROLLMENT:</span> {studentInfo.enrollmentNo}</p>
            <p><span className="font-bold text-gray-500">COURSE:</span> {studentInfo.course}</p>
          </div>
          <div className="space-y-1 text-right">
            <p><span className="font-bold text-gray-500">RECEIPT NO:</span> {receipt.receiptId}</p>
            <p><span className="font-bold text-gray-500">DATE:</span> {receipt.paidOn}</p>
            <p><span className="font-bold text-gray-500">STATUS:</span> <span className="text-green-600 font-bold">SUCCESSFUL</span></p>
          </div>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b-2 border-gray-800 bg-gray-50">
              <th className="py-2 pl-2 text-left text-gray-600">Description</th>
              <th className="py-2 pr-2 text-right text-gray-600">Amount (INR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr><td className="py-3 pl-2 font-medium">Semester Tuition Fee ({receipt.semester})</td><td className="py-3 text-right pr-2 font-mono">₹{receipt.tuitionFee}</td></tr>
            <tr><td className="py-3 pl-2 font-medium">Bus Transport Fee</td><td className="py-3 text-right pr-2 font-mono">₹{receipt.busFee}</td></tr>
            <tr><td className="py-3 pl-2 font-medium">Hostel / Accommodation</td><td className="py-3 text-right pr-2 font-mono">₹{receipt.hostelFee}</td></tr>
            <tr><td className="py-2 pl-2 text-red-500">Late Fines</td><td className="py-2 text-right pr-2 text-red-500">₹{receipt.fine}</td></tr>
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-800">
              <td className="py-3 pl-2 font-bold text-lg">TOTAL PAID</td>
              <td className="py-3 pr-2 text-right font-bold text-lg">₹{totalPaid.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>

        <div className="text-[10px] text-gray-400 text-center mt-2 mb-4">
          <p>Transaction ID: {receipt.transactionId || 'TXN_GENERIC_123'}</p>
          <p>This is a computer generated receipt. Signature not required.</p>
        </div>

        <div className="mt-auto flex gap-3 no-print">
          <button onClick={() => onPrint(receipt)} className="flex-1 bg-gray-900 text-white py-2 rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. MAIN COMPONENT (Page Assembly)
   ========================================================================= */

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null); 
  const [viewReceipt, setViewReceipt] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handlePayClick = (row) => setSelectedPayment(row);
  const handleViewClick = (row, e) => {
    e.stopPropagation();
    setViewReceipt(row);
  };
  const closeModals = () => {
    setSelectedPayment(null);
    setViewReceipt(null);
  };

  const handlePrintReceipt = (row) => {
    setViewReceipt(row);
    setTimeout(() => { window.print(); }, 300);
  };

  return (
    <div className="min-h-screen bg-[#050509] text-gray-100 font-sans p-4 md:p-8 pb-32 relative">
      <div className="fixed top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      
      {/* CSS for printing only the receipt */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .printable-receipt, .printable-receipt * { visibility: visible; }
          .printable-receipt { 
             position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 20px; 
             background: white; color: black; box-shadow: none; border: none;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 max-w-[1400px] mx-auto no-print">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 rounded-2xl bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Fee Management</h1>
            <p className="text-gray-400 text-xs mt-1">Track your payments and clear dues</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm font-bold transition-all">
            <Download className="w-4 h-4" /> Download Statement
          </button>
        </div>
      </header>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto no-print">
        <div className="lg:col-span-3">
           <PaymentProfileCard />
        </div>
        <div className="lg:col-span-9">
          <FeeLedgerTable 
            onPay={handlePayClick}
            onViewReceipt={handleViewClick}
            onPrintReceipt={handlePrintReceipt}
          />
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {selectedPayment && (
          <SimpleModal onClose={closeModals}>
             <div className="bg-[#1A1B26] border border-gray-700 rounded-3xl w-full shadow-2xl overflow-hidden">
                <PaymentGatewayModal semester={selectedPayment} onClose={closeModals} />
             </div>
          </SimpleModal>
        )}

        {viewReceipt && (
          <SimpleModal onClose={closeModals}>
             <ReceiptModal receipt={viewReceipt} onClose={closeModals} onPrint={() => window.print()} />
          </SimpleModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentHistory;