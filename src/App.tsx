/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  Calendar, 
  User, 
  Building2, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Printer,
  Plus,
  Trash2,
  Download
} from 'lucide-react';

// --- Types ---

interface TestResult {
  posn: number;
  resistance: string;
  pass: boolean;
  fail: boolean;
  groundType: string;
}

interface RemedialItem {
  itemNumber: number;
  observation: string;
  recommendation: string;
  severity: 'High' | 'Medium' | 'Low' | 'For information';
}

// --- Components ---

const FormSection = ({ title, children, number }: { title: string, children: React.ReactNode, number?: string }) => (
  <div className="mb-8 border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm">
    <div className="bg-slate-100 px-4 py-2 border-bottom border-slate-300 flex items-center gap-3">
      {number && <span className="font-bold text-slate-700 text-lg">{number}.</span>}
      <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">{title}</h2>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

const TableRow = ({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) => (
  <div className={`grid grid-cols-1 md:grid-cols-4 border-b border-slate-200 last:border-0 ${className}`}>
    <div className="md:col-span-1 bg-slate-50 p-2 font-semibold text-xs text-slate-600 flex items-center border-r border-slate-200">
      {label}
    </div>
    <div className="md:col-span-3 p-2 flex flex-wrap gap-4 items-center">
      {children}
    </div>
  </div>
);

const CheckboxGroup = ({ options, name, value, onChange }: { options: string[], name: string, value: string, onChange: (val: string) => void }) => (
  <div className="flex flex-wrap gap-4">
    {options.map(opt => (
      <label key={opt} className="flex items-center gap-2 cursor-pointer group">
        <div 
          onClick={() => onChange(opt)}
          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${value === opt ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}
        >
          {value === opt && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
        <span className="text-sm text-slate-700">{opt}</span>
      </label>
    ))}
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    companyTitle: 'Oxford University Estates Directorate',
    locationTested: 'Building 130 – Western Library (formerly New Bodleian Library)',
    dateTested: '2025-05-01',
    inspectorName: 'Mr R Birtwistle',
    testInstrument: 'E8201173',
    
    // Section 1
    s1Type: 'Copper',
    s1Size: '25 x 3',
    s1Coverings: 'Bare',
    s1Fixings: 'Metallic',
    s1Bonds: 'All OK',
    s1Roof: 'Flat',
    s1Comments: 'A substantial air termination network was found to be installed throughout this establishment in full accordance with the guidelines of BS6651:1999 (original design criteria).',
    
    // Section 2
    s2Type: 'Copper',
    s2Size: '25 x 3',
    s2Coverings: 'Bare',
    s2Fixings: 'Metallic',
    s2Bonds: 'All OK',
    s2Comments: 'Insufficient down conductors installed throughout the perimeter of the structure, however 2 No. additional down conductors have been installed as part of the recent refurbishment works.',
    
    // Section 3
    s3Chamber: 'None',
    s3Electrodes: 'Unidentifiable',
    s3SizeElectrodes: 'Unidentifiable',
    s3ConnectionsAcceptable: 'Unidentifiable',
    s3ClampsFitted: 'YES',
    s3LabelsFitted: 'NO',
    s3ConductorTape: '25 x 3mm bare copper.',
    s3EquipotentialBond: 'Unidentifiable',
    s3CableSize: '',
    s3Comments: '',

    // Section 4 Summary
    overallResistance: '1.01',
    atmosphericConditions: 'Sunny',
    groundConditions: 'DRY',
    testMethod: 'Simplified',

    // Section 5
    observations: 'Earth impedance readings obtained at the time of our testing and inspection survey are clearly below the maximum recommended (60.0 ohms) permissible, in accordance with the guidelines of BS6651: 1999, Original installation design criteria.\n\nA Test Certificate, No. 111945, has been enclosed and is valid for a period of 12 months from the date of test.',
    priceSchedule: 'Please refer to attached',
    nextInspectionDate: '2026-04-01'
  });

  const [remedialItems, setRemedialItems] = useState<RemedialItem[]>([
    {
      itemNumber: 1,
      observation: 'All extraneous metallic plant items (listed below) require cross bonding into the lightning protection system, therefore preventing any side flash over occurrence in full accordance with the British Standard guidelines.',
      recommendation: 'Handrail x 2, Stepover Step x 1',
      severity: 'Medium'
    }
  ]);

  const [testResults, setTestResults] = useState<TestResult[]>(
    Array.from({ length: 6 }, (_, i) => ({
      posn: i + 1,
      resistance: ['0.90', '0.64', '0.57', '47.1', '0.68', '9.12'][i] || '',
      pass: true,
      fail: false,
      groundType: i === 0 ? 'Test at Roof' : i < 4 ? 'T' : 'Flag Stones'
    }))
  );

  const addRow = () => {
    setTestResults(prev => [
      ...prev,
      {
        posn: prev.length + 1,
        resistance: '',
        pass: false,
        fail: false,
        groundType: ''
      }
    ]);
  };

  const removeRow = (index: number) => {
    if (testResults.length <= 1) return;
    const newResults = testResults.filter((_, i) => i !== index)
      .map((row, i) => ({ ...row, posn: i + 1 }));
    setTestResults(newResults);
  };

  const addRemedialItem = () => {
    setRemedialItems(prev => [
      ...prev,
      {
        itemNumber: prev.length + 1,
        observation: '',
        recommendation: '',
        severity: 'For information'
      }
    ]);
  };

  const removeRemedialItem = (index: number) => {
    const newItems = remedialItems.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, itemNumber: i + 1 }));
    setRemedialItems(newItems);
  };

  const handleRemedialChange = (index: number, field: keyof RemedialItem, value: any) => {
    const newItems = [...remedialItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setRemedialItems(newItems);
  };

  const downloadCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const val = row[header.toLowerCase().replace(/ /g, '')] || row[header.toLowerCase()] || '';
          // Escape quotes and wrap in quotes if contains comma
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTestResultsCSV = () => {
    const headers = ['Posn No', 'Resistance', 'Pass', 'Fail', 'Ground Type'];
    const data = testResults.map(r => ({
      posnno: r.posn,
      resistance: r.resistance,
      pass: r.pass ? 'Yes' : 'No',
      fail: r.fail ? 'Yes' : 'No',
      groundtype: r.groundType
    }));
    downloadCSV(data, 'earth_electrode_results.csv', headers);
  };

  const downloadRemedialCSV = () => {
    const headers = ['Item Number', 'Observation', 'Recommendation', 'Severity'];
    const data = remedialItems.map(r => ({
      itemnumber: r.itemNumber,
      observation: r.observation,
      recommendation: r.recommendation,
      severity: r.severity
    }));
    downloadCSV(data, 'remedial_works.csv', headers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTestResultChange = (index: number, field: keyof TestResult, value: any) => {
    const newResults = [...testResults];
    newResults[index] = { ...newResults[index], [field]: value };
    setTestResults(newResults);
  };

  const printForm = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-white p-8 border-b-4 border-indigo-600">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="text-slate-500 text-xs font-medium uppercase tracking-widest">
              Oxford University Estates Directorate<br />
              Building 130 – New Bodleian Library
            </div>
            <div className="text-slate-400 text-xs">Page 1 of 3</div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-700 underline decoration-indigo-600 decoration-2 underline-offset-8">LIGHTNING CONDUCTOR INSPECTION REPORT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Company Title</label>
                <input 
                  type="text" 
                  name="companyTitle"
                  value={formData.companyTitle}
                  onChange={handleInputChange}
                  className="border-b-2 border-slate-200 focus:border-indigo-500 outline-none py-1 font-medium text-lg bg-transparent transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Location(s) Tested</label>
                <input 
                  type="text" 
                  name="locationTested"
                  value={formData.locationTested}
                  onChange={handleInputChange}
                  className="border-b-2 border-slate-200 focus:border-indigo-500 outline-none py-1 font-medium bg-transparent transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Date Tested</label>
                <input 
                  type="date" 
                  name="dateTested"
                  value={formData.dateTested}
                  onChange={handleInputChange}
                  className="border-b-2 border-slate-200 focus:border-indigo-500 outline-none py-1 font-medium bg-transparent transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase">Test Instrument</label>
                <input 
                  type="text" 
                  name="testInstrument"
                  value={formData.testInstrument}
                  onChange={handleInputChange}
                  className="border-b-2 border-slate-200 focus:border-indigo-500 outline-none py-1 font-medium bg-transparent transition-colors"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Name of Inspector</label>
                <input 
                  type="text" 
                  name="inspectorName"
                  value={formData.inspectorName}
                  onChange={handleInputChange}
                  className="border-b-2 border-slate-200 focus:border-indigo-500 outline-none py-1 font-medium bg-transparent transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-8">
          
          {/* Section 1: Air Termination Network */}
          <FormSection title="Air Termination Network" number="1">
            <div className="border border-slate-200 rounded overflow-hidden">
              <TableRow label="Type of Conductor">
                <CheckboxGroup 
                  options={['Copper', 'Aluminium', 'Other']} 
                  name="s1Type" 
                  value={formData.s1Type} 
                  onChange={(val) => setFormData(p => ({...p, s1Type: val}))} 
                />
                {formData.s1Type === 'Other' && <input type="text" placeholder="Specify" className="border-b border-slate-300 text-sm outline-none px-2" />}
              </TableRow>
              <TableRow label="Size of Conductor">
                <CheckboxGroup 
                  options={['25 x 3', '20 x 3', '8mm', 'Other']} 
                  name="s1Size" 
                  value={formData.s1Size} 
                  onChange={(val) => setFormData(p => ({...p, s1Size: val}))} 
                />
              </TableRow>
              <TableRow label="Coverings">
                <CheckboxGroup 
                  options={['Bare', 'PVC']} 
                  name="s1Coverings" 
                  value={formData.s1Coverings} 
                  onChange={(val) => setFormData(p => ({...p, s1Coverings: val}))} 
                />
                <input type="text" placeholder="Specify Colour" className="border-b border-slate-300 text-sm outline-none px-2" />
              </TableRow>
              <TableRow label="Type of Fixings">
                <CheckboxGroup 
                  options={['Metallic', 'Non Metallic', 'Other']} 
                  name="s1Fixings" 
                  value={formData.s1Fixings} 
                  onChange={(val) => setFormData(p => ({...p, s1Fixings: val}))} 
                />
              </TableRow>
              <TableRow label="Bonds & Joints">
                <CheckboxGroup 
                  options={['All OK', 'Defects', 'Bonding works required']} 
                  name="s1Bonds" 
                  value={formData.s1Bonds} 
                  onChange={(val) => setFormData(p => ({...p, s1Bonds: val}))} 
                />
              </TableRow>
              <TableRow label="Type of Roof">
                <CheckboxGroup 
                  options={['Flat', 'Pitched', 'Other']} 
                  name="s1Roof" 
                  value={formData.s1Roof} 
                  onChange={(val) => setFormData(p => ({...p, s1Roof: val}))} 
                />
                <div className="flex gap-4 items-center ml-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Height to ridge</span>
                    <input type="text" className="border-b border-slate-300 text-xs w-20 outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Height to eaves</span>
                    <input type="text" className="border-b border-slate-300 text-xs w-20 outline-none" />
                  </div>
                </div>
              </TableRow>
              <div className="p-3 bg-slate-50">
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Comments</label>
                <textarea 
                  name="s1Comments"
                  value={formData.s1Comments}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded p-2 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </FormSection>

          {/* Section 2: Down Conductor Network */}
          <FormSection title="Down Conductor Network" number="2">
            <div className="border border-slate-200 rounded overflow-hidden">
              <TableRow label="Type of Conductor">
                <CheckboxGroup 
                  options={['Copper', 'Aluminium', 'Other']} 
                  name="s2Type" 
                  value={formData.s2Type} 
                  onChange={(val) => setFormData(p => ({...p, s2Type: val}))} 
                />
              </TableRow>
              <TableRow label="Size of Conductor">
                <CheckboxGroup 
                  options={['25 x 3', '20 x 3', '8mm', 'Other']} 
                  name="s2Size" 
                  value={formData.s2Size} 
                  onChange={(val) => setFormData(p => ({...p, s2Size: val}))} 
                />
              </TableRow>
              <TableRow label="Coverings">
                <CheckboxGroup 
                  options={['Bare', 'PVC']} 
                  name="s2Coverings" 
                  value={formData.s2Coverings} 
                  onChange={(val) => setFormData(p => ({...p, s2Coverings: val}))} 
                />
              </TableRow>
              <TableRow label="Type of Fixings">
                <CheckboxGroup 
                  options={['Metallic', 'Non Metallic', 'Other']} 
                  name="s2Fixings" 
                  value={formData.s2Fixings} 
                  onChange={(val) => setFormData(p => ({...p, s2Fixings: val}))} 
                />
              </TableRow>
              <TableRow label="Bonds">
                <CheckboxGroup 
                  options={['All OK', 'Defects']} 
                  name="s2Bonds" 
                  value={formData.s2Bonds} 
                  onChange={(val) => setFormData(p => ({...p, s2Bonds: val}))} 
                />
              </TableRow>
              <div className="p-3 bg-slate-50">
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Comments</label>
                <textarea 
                  name="s2Comments"
                  value={formData.s2Comments}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded p-2 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </FormSection>

          {/* Section 3: Earth System */}
          <FormSection title="Earth System" number="3">
            <div className="border border-slate-200 rounded overflow-hidden">
              <TableRow label="Type of Inspection Chamber">
                <CheckboxGroup 
                  options={['Concrete', 'Plastic', 'None']} 
                  name="s3Chamber" 
                  value={formData.s3Chamber} 
                  onChange={(val) => setFormData(p => ({...p, s3Chamber: val}))} 
                />
              </TableRow>
              <TableRow label="Type of Electrodes">
                <CheckboxGroup 
                  options={['Copper', 'Copper Clad', 'Unidentifiable']} 
                  name="s3Electrodes" 
                  value={formData.s3Electrodes} 
                  onChange={(val) => setFormData(p => ({...p, s3Electrodes: val}))} 
                />
              </TableRow>
              <TableRow label="Size of Electrodes">
                <CheckboxGroup 
                  options={['15/16mm', '20mm', 'Unidentifiable']} 
                  name="s3SizeElectrodes" 
                  value={formData.s3SizeElectrodes} 
                  onChange={(val) => setFormData(p => ({...p, s3SizeElectrodes: val}))} 
                />
              </TableRow>
              <TableRow label="Connections Acceptable?">
                <CheckboxGroup 
                  options={['YES', 'NO', 'Unidentifiable']} 
                  name="s3ConnectionsAcceptable" 
                  value={formData.s3ConnectionsAcceptable} 
                  onChange={(val) => setFormData(p => ({...p, s3ConnectionsAcceptable: val}))} 
                />
              </TableRow>
              <TableRow label="Are Test Clamps Fitted?">
                <CheckboxGroup 
                  options={['YES', 'NO']} 
                  name="s3ClampsFitted" 
                  value={formData.s3ClampsFitted} 
                  onChange={(val) => setFormData(p => ({...p, s3ClampsFitted: val}))} 
                />
                <span className="text-xs text-slate-400 italic">Gunmetal Oblong & Circular Types.</span>
              </TableRow>
              <TableRow label="Are Labels Fitted?">
                <CheckboxGroup 
                  options={['YES', 'NO']} 
                  name="s3LabelsFitted" 
                  value={formData.s3LabelsFitted} 
                  onChange={(val) => setFormData(p => ({...p, s3LabelsFitted: val}))} 
                />
              </TableRow>
              <TableRow label="Conductor Tape">
                <input 
                  type="text" 
                  name="s3ConductorTape"
                  value={formData.s3ConductorTape}
                  onChange={handleInputChange}
                  className="w-full border-b border-slate-200 outline-none text-sm py-1"
                />
              </TableRow>
              <TableRow label="Is an Equipotential Bond Fitted?">
                <div className="flex gap-8 items-center w-full">
                  <CheckboxGroup 
                    options={['YES', 'NO', 'Unidentifiable']} 
                    name="s3EquipotentialBond" 
                    value={formData.s3EquipotentialBond} 
                    onChange={(val) => setFormData(p => ({...p, s3EquipotentialBond: val}))} 
                  />
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs font-bold text-slate-500">Size of Cable (mm²)</span>
                    <input type="text" className="border-b border-slate-300 w-16 outline-none text-sm" />
                  </div>
                </div>
              </TableRow>
            </div>
          </FormSection>

          {/* Section 4: Earth Electrode Test Results */}
          <FormSection title="Earth Electrode Test Results and Ground Conditions" number="4">
            <div className="flex justify-end mb-4 gap-2">
              <button 
                onClick={downloadTestResultsCSV}
                className="flex items-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-md text-xs font-bold transition-colors border border-slate-200"
              >
                <Download className="w-3 h-3" />
                Download CSV
              </button>
              <button 
                onClick={addRow}
                className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-md text-xs font-bold transition-colors border border-indigo-200"
              >
                <Plus className="w-3 h-3" />
                Add Row
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-300">
              {/* Table Column 1 */}
              <div className="border-r border-slate-300">
                <div className="grid grid-cols-6 bg-slate-100 border-b border-slate-300 text-[10px] font-bold uppercase text-slate-600 text-center">
                  <div className="p-1 border-r border-slate-300">Posn No.</div>
                  <div className="p-1 border-r border-slate-300 col-span-1">Resistance In Ohms</div>
                  <div className="p-1 border-r border-slate-300">Pass</div>
                  <div className="p-1 border-r border-slate-300">Fail</div>
                  <div className="p-1 border-r border-slate-300">Ground Type</div>
                  <div className="p-1">Action</div>
                </div>
                {testResults.slice(0, Math.ceil(testResults.length / 2)).map((row, idx) => (
                  <div key={row.posn} className="grid grid-cols-6 border-b border-slate-200 last:border-0 text-xs text-center h-8">
                    <div className="p-1 border-r border-slate-200 flex items-center justify-center font-bold bg-slate-50">{row.posn}</div>
                    <input 
                      type="text" 
                      value={row.resistance}
                      onChange={(e) => handleTestResultChange(idx, 'resistance', e.target.value)}
                      className="p-1 border-r border-slate-200 outline-none focus:bg-indigo-50 text-center"
                    />
                    <div 
                      onClick={() => handleTestResultChange(idx, 'pass', !row.pass)}
                      className="p-1 border-r border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50"
                    >
                      {row.pass && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div 
                      onClick={() => handleTestResultChange(idx, 'fail', !row.fail)}
                      className="p-1 border-r border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50"
                    >
                      {row.fail && <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </div>
                    <input 
                      type="text" 
                      value={row.groundType}
                      onChange={(e) => handleTestResultChange(idx, 'groundType', e.target.value)}
                      className="p-1 border-r border-slate-200 outline-none focus:bg-indigo-50 text-center text-[10px]"
                    />
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => removeRow(idx)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Column 2 */}
              <div>
                <div className="grid grid-cols-6 bg-slate-100 border-b border-slate-300 text-[10px] font-bold uppercase text-slate-600 text-center">
                  <div className="p-1 border-r border-slate-300">Posn No.</div>
                  <div className="p-1 border-r border-slate-300 col-span-1">Resistance In Ohms</div>
                  <div className="p-1 border-r border-slate-300">Pass</div>
                  <div className="p-1 border-r border-slate-300">Fail</div>
                  <div className="p-1 border-r border-slate-300">Ground Type</div>
                  <div className="p-1">Action</div>
                </div>
                {testResults.slice(Math.ceil(testResults.length / 2)).map((row, idx) => {
                  const actualIndex = idx + Math.ceil(testResults.length / 2);
                  return (
                    <div key={row.posn} className="grid grid-cols-6 border-b border-slate-200 last:border-0 text-xs text-center h-8">
                      <div className="p-1 border-r border-slate-200 flex items-center justify-center font-bold bg-slate-50">{row.posn}</div>
                      <input 
                        type="text" 
                        value={row.resistance}
                        onChange={(e) => handleTestResultChange(actualIndex, 'resistance', e.target.value)}
                        className="p-1 border-r border-slate-200 outline-none focus:bg-indigo-50 text-center"
                      />
                      <div 
                        onClick={() => handleTestResultChange(actualIndex, 'pass', !row.pass)}
                        className="p-1 border-r border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50"
                      >
                        {row.pass && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div 
                        onClick={() => handleTestResultChange(actualIndex, 'fail', !row.fail)}
                        className="p-1 border-r border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50"
                      >
                        {row.fail && <AlertCircle className="w-4 h-4 text-rose-500" />}
                      </div>
                      <input 
                        type="text" 
                        value={row.groundType}
                        onChange={(e) => handleTestResultChange(actualIndex, 'groundType', e.target.value)}
                        className="p-1 border-r border-slate-200 outline-none focus:bg-indigo-50 text-center text-[10px]"
                      />
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => removeRow(actualIndex)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ground Type Legend */}
            <div className="mt-4 p-2 border border-slate-200 rounded bg-slate-50 flex flex-wrap gap-6 items-center justify-center text-[10px] font-bold uppercase text-slate-500">
              <div className="flex items-center gap-2"><span>Tarmac = T</span></div>
              <div className="flex items-center gap-2"><span>Concrete = C</span></div>
              <div className="flex items-center gap-2"><span>Soil = S</span></div>
              <div className="flex items-center gap-2">
                <span>Other:</span>
                <input type="text" placeholder="Specify" className="border-b border-slate-300 bg-transparent outline-none w-32" />
              </div>
            </div>

            {/* Summary Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded p-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Overall Resistance Reading</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">=</span>
                  <input 
                    type="text" 
                    name="overallResistance"
                    value={formData.overallResistance}
                    onChange={handleInputChange}
                    className="border-b border-slate-300 w-16 text-center font-bold outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500">ohms</span>
                </div>
              </div>
              <div className="border border-slate-200 rounded p-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Atmospheric Conditions</span>
                <input 
                  type="text" 
                  name="atmosphericConditions"
                  value={formData.atmosphericConditions}
                  onChange={handleInputChange}
                  className="border-b border-slate-300 w-32 text-center font-bold outline-none"
                />
              </div>
              <div className="border border-slate-200 rounded p-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Ground Conditions</span>
                <CheckboxGroup 
                  options={['WET', 'DRY', 'DAMP']} 
                  name="groundConditions" 
                  value={formData.groundConditions} 
                  onChange={(val) => setFormData(p => ({...p, groundConditions: val}))} 
                />
              </div>
              <div className="border border-slate-200 rounded p-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Test Method</span>
                <CheckboxGroup 
                  options={['Simplified', '3 Pole', 'Other']} 
                  name="testMethod" 
                  value={formData.testMethod} 
                  onChange={(val) => setFormData(p => ({...p, testMethod: val}))} 
                />
              </div>
            </div>
          </FormSection>

          {/* Section 5: Observations & Recommendations */}
          <FormSection title="General Observations / Recommendations" number="5">
            <div className="space-y-6">
              <div>
                <textarea 
                  name="observations"
                  value={formData.observations}
                  onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded p-4 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed"
                  placeholder="Enter general observations..."
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-slate-700 underline decoration-indigo-500/30">Report & Remedial Works Identified</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={downloadRemedialCSV}
                      className="flex items-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100 px-3 py-1 rounded-md text-[10px] font-bold transition-colors border border-slate-200"
                    >
                      <Download className="w-3 h-3" />
                      Download CSV
                    </button>
                    <button 
                      onClick={addRemedialItem}
                      className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1 rounded-md text-[10px] font-bold transition-colors border border-indigo-200"
                    >
                      <Plus className="w-3 h-3" />
                      Add Item
                    </button>
                  </div>
                </div>
                <div className="border border-slate-200 rounded overflow-hidden shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="p-2 border-r border-slate-200 w-16 text-center">Item No.</th>
                        <th className="p-2 border-r border-slate-200">Observation</th>
                        <th className="p-2 border-r border-slate-200">Recommendation</th>
                        <th className="p-2 border-r border-slate-200 w-32">Severity Code</th>
                        <th className="p-2 w-12 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remedialItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="p-2 border-r border-slate-200 text-center font-bold bg-slate-50/30">{item.itemNumber}</td>
                          <td className="p-2 border-r border-slate-200">
                            <textarea 
                              value={item.observation}
                              onChange={(e) => handleRemedialChange(idx, 'observation', e.target.value)}
                              className="w-full bg-transparent outline-none resize-none text-xs min-h-[40px] leading-relaxed"
                              placeholder="Describe the observation..."
                            />
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <textarea 
                              value={item.recommendation}
                              onChange={(e) => handleRemedialChange(idx, 'recommendation', e.target.value)}
                              className="w-full bg-transparent outline-none resize-none text-xs min-h-[40px] leading-relaxed"
                              placeholder="Enter recommendation..."
                            />
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <select 
                              value={item.severity}
                              onChange={(e) => handleRemedialChange(idx, 'severity', e.target.value as any)}
                              className={`w-full bg-transparent outline-none text-xs font-bold px-1 py-1 rounded ${
                                item.severity === 'High' ? 'text-rose-600' : 
                                item.severity === 'Medium' ? 'text-amber-600' : 
                                item.severity === 'Low' ? 'text-emerald-600' : 'text-slate-500'
                              }`}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                              <option value="For information">For information</option>
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <button 
                              onClick={() => removeRemedialItem(idx)}
                              className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {remedialItems.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400 italic text-xs bg-slate-50/30">
                            No remedial works identified.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-2">Price Schedule</h3>
                  <textarea 
                    name="priceSchedule"
                    value={formData.priceSchedule}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded p-3 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex flex-col justify-end">
                   <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-500 uppercase">Tests Carried Out By:</span>
                        <input 
                          type="text" 
                          name="inspectorName"
                          value={formData.inspectorName}
                          onChange={handleInputChange}
                          className="border-b border-slate-300 bg-transparent outline-none w-40 text-right font-bold"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-500 uppercase">Date:</span>
                        <input 
                          type="date" 
                          name="dateTested"
                          value={formData.dateTested}
                          onChange={handleInputChange}
                          className="border-b border-slate-300 bg-transparent outline-none w-40 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                        <span className="font-bold text-indigo-600 uppercase">Next Inspection Due:</span>
                        <input 
                          type="date" 
                          name="nextInspectionDate"
                          value={formData.nextInspectionDate}
                          onChange={handleInputChange}
                          className="border-b border-indigo-300 bg-transparent outline-none w-40 text-right font-bold text-indigo-700"
                        />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </FormSection>
        </div>

        {/* Footer / Actions */}
        <div className="bg-slate-900 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-indigo-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Lightning Protection Systems</div>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={printForm}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-bold"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/20">
              <ClipboardCheck className="w-4 h-4" />
              Submit Inspection
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="max-w-5xl mx-auto mt-8 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em]">
        © 2025 • All Rights Reserved
      </div>
    </div>
  );
}
