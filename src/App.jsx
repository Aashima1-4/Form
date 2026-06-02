import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Settings,
  Signature,
  Sparkles,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle,
  Shield,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import SignaturePad from './components/SignaturePad';

// Presets for the quick templates
const TEMPLATES = [
  {
    name: 'Cyber Lab Panchkula',
    labName: 'Cyber Forensic Laboratory, Panchkula, Haryana',
    caseNumber: '20-CF-112',
    allotmentDate: '2026-05-20',
    allottedTo: 'Karishma Saini',
    authorizedCollector: 'ASI Satish Kumar, No. 1245/PKL',
    recommendedName: 'Inspector Anil Kumar',
    recommendedDesignation: 'SHO Sector 5, Panchkula',
    parcelsNumberType: '2 sealed parcels (Cloth bags with seal impression of "KV")',
    caseDetails: 'Investigation of suspicious digital media recovered from crime scene.',
    remarks: 'Urgent examination requested for court filing.',
    exhibitsDetails: '1. One Seagate 1TB HDD (S/N: W460XYZ)\n2. One SanDisk 64GB USB Drive',
    authorizedByRole: 'AD/Cyber',
    handoverToName: 'Karishma Saini',
    handoverByName: 'ASI Satish Kumar',
    sigNames: {
      recommended: 'Anil Kumar',
      authorized: 'Gaurav Veer',
      handoverTo: 'Karishma Saini',
      handoverBy: 'Satish Kumar'
    },
    sigTypes: {
      recommended: 'type',
      authorized: 'type',
      handoverTo: 'type',
      handoverBy: 'type'
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('details');
  const [zoom, setZoom] = useState(80); // A4 preview scale
  const [toast, setToast] = useState({ show: false, message: '' });

  // Main Form State (Automatically Mirrored from top to bottom)
  const [formData, setFormData] = useState({
    labName: 'Cyber Forensic Laboratory, Panchkula, Haryana',
    caseNumber: '20-CF-112',
    allotmentDate: '2026-05-20',
    allottedTo: 'Karishma Saini',
    authorizedCollector: 'ASI Satish Kumar, No. 1245/PKL',
    recommendedName: 'Inspector Anil Kumar',
    recommendedDesignation: 'SHO Sector 5, Panchkula',
    parcelsNumberType: '2 sealed parcels (Cloth bags with seal impression of "KV")',
    caseDetails: 'Investigation of suspicious digital media recovered from crime scene.',
    remarks: 'Urgent examination requested for court filing.',
    exhibitsDetails: '1. One Seagate 1TB HDD (S/N: W460XYZ)\n2. One SanDisk 64GB USB Drive',
    authorizedByRole: 'AD/Cyber',
    handoverToName: 'Karishma Saini',
    handoverByName: 'ASI Satish Kumar'
  });

  // Signature States
  const [sigTypes, setSigTypes] = useState({
    recommended: 'type',
    authorized: 'type',
    handoverTo: 'type',
    handoverBy: 'type'
  });

  const [sigDrawings, setSigDrawings] = useState({
    recommended: null,
    authorized: null,
    handoverTo: null,
    handoverBy: null
  });

  const [sigNames, setSigNames] = useState({
    recommended: 'Anil Kumar',
    authorized: 'Gaurav Veer',
    handoverTo: 'Karishma Saini',
    handoverBy: 'Satish Kumar'
  });

  // Settings
  const [theme, setTheme] = useState('black'); // black, blue, green, charcoal
  const [fontStyle, setFontStyle] = useState('serif'); // serif, sans, mono
  const [showCutGuide, setShowCutGuide] = useState(true);

  // Trigger temporary toast notification
  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // Sync names to typed signatures when changes are made
  useEffect(() => {
    setSigNames(prev => ({
      ...prev,
      recommended: formData.recommendedName || prev.recommended,
      handoverTo: formData.handoverToName || prev.handoverTo,
      handoverBy: formData.handoverByName || prev.handoverBy
    }));
  }, [formData.recommendedName, formData.handoverToName, formData.handoverByName]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSigTypeChange = (role, type) => {
    setSigTypes(prev => ({ ...prev, [role]: type }));
  };

  const handleSigDrawingChange = (role, drawing) => {
    setSigDrawings(prev => ({ ...prev, [role]: drawing }));
  };

  const handleSigNameChange = (role, name) => {
    setSigNames(prev => ({ ...prev, [role]: name }));
  };

  const applyTemplate = (template) => {
    setFormData({
      labName: template.labName,
      caseNumber: template.caseNumber,
      allotmentDate: template.allotmentDate,
      allottedTo: template.allottedTo,
      authorizedCollector: template.authorizedCollector,
      recommendedName: template.recommendedName,
      recommendedDesignation: template.recommendedDesignation,
      parcelsNumberType: template.parcelsNumberType,
      caseDetails: template.caseDetails,
      remarks: template.remarks,
      exhibitsDetails: template.exhibitsDetails,
      authorizedByRole: template.authorizedByRole,
      handoverToName: template.handoverToName,
      handoverByName: template.handoverByName
    });
    setSigNames(template.sigNames);
    setSigTypes(template.sigTypes);
    setSigDrawings({
      recommended: null,
      authorized: null,
      handoverTo: null,
      handoverBy: null
    });
    triggerToast(`Applied preset for: ${template.name}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const clearAll = () => {
    setFormData({
      labName: 'Cyber Forensic Laboratory, Panchkula, Haryana',
      caseNumber: '',
      allotmentDate: new Date().toISOString().split('T')[0],
      allottedTo: '',
      authorizedCollector: '',
      recommendedName: '',
      recommendedDesignation: '',
      parcelsNumberType: '',
      caseDetails: '',
      remarks: '',
      exhibitsDetails: '',
      authorizedByRole: 'AD/Cyber',
      handoverToName: '',
      handoverByName: ''
    });
    setSigDrawings({
      recommended: null,
      authorized: null,
      handoverTo: null,
      handoverBy: null
    });
    setSigNames({
      recommended: '',
      authorized: 'AD/Cyber',
      handoverTo: '',
      handoverBy: ''
    });
    triggerToast('Cleared all form fields');
  };

  // Preset Theme colors for the printed document
  const getThemeColorClass = () => {
    switch (theme) {
      case 'blue': return { primary: '#1e3a8a', secondary: '#3b82f6', border: '#1e3a8a' };
      case 'green': return { primary: '#064e3b', secondary: '#10b981', border: '#064e3b' };
      case 'charcoal': return { primary: '#334155', secondary: '#64748b', border: '#334155' };
      case 'black':
      default:
        return { primary: '#000000', secondary: '#333333', border: '#000000' };
    }
  };

  const colors = getThemeColorClass();

  // Helper to render signature inside paper preview
  const renderSignature = (role) => {
    if (sigTypes[role] === 'draw') {
      if (sigDrawings[role]) {
        return <img src={sigDrawings[role]} alt={`${role} signature`} className="doc-signature-img" />;
      }
      return <div className="doc-signature-placeholder" />;
    } else {
      if (sigNames[role]) {
        return <span className="doc-signature-typed">{sigNames[role]}</span>;
      }
      return <div className="doc-signature-placeholder" />;
    }
  };

  // Shared form JSX that renders a single copy of the document
  const renderSingleForm = () => {
    return (
      <div className="allotment-form-half">
        {/* Underlined centered formal header */}
        <div className="formal-header-text">
          Exhibit/s Allotment Form ({formData.labName})
        </div>

        {/* Section 1: Top Metadata Side-by-Side Grid */}
        <div className="form-info-row">
          {/* Left Column: Case Information */}
          <div className="info-block-col">
            <div className="block-title">Case Information:</div>
            <div className="info-item">
              <span className="item-label">1. Case Name/Number:</span>
              <span className="item-value">{formData.caseNumber || ''}</span>
            </div>
            <div className="info-item">
              <span className="item-label">2. Date:</span>
              <span className="item-value">{formData.allotmentDate || ''}</span>
            </div>
            <div className="info-item">
              <span className="item-label">3. Allotted To:</span>
              <span className="item-value">{formData.allottedTo || ''}</span>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="info-block-col">
            <div className="block-title">Information:</div>
            <div className="info-item">
              <span className="item-label">1. Person/Designation authorized to collect Exhibit/s:</span>
            </div>
            <div className="info-item-nested">
              <span className="item-value-nested">{formData.authorizedCollector || ''}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Detailed Allotment Grid Table */}
        <table className="allotment-table">
          <thead>
            <tr>
              <th style={{ width: '6%' }}>Sr. No.</th>
              <th style={{ width: '22%' }}>Particulars</th>
              <th style={{ width: '32%' }}>Information</th>
              <th style={{ width: '20%' }}>Particulars</th>
              <th style={{ width: '20%' }}>Information</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td className="text-center">1.</td>
              <td>
                <strong>Person Recommended By:</strong>
              </td>
              <td>
                <div className="nested-field">
                  <span className="label-bold">Name:</span> {formData.recommendedName}
                </div>
                <div className="nested-field-sig">
                  <span className="label-bold">Signature:</span>
                  <div className="table-sig-box">{renderSignature('recommended')}</div>
                </div>
                <div className="nested-field">
                  <span className="label-bold">Designation:</span> {formData.recommendedDesignation}
                </div>
              </td>
              <td>
                <strong>Number / Type of Parcel/s:</strong>
              </td>
              <td className="align-top-left font-content">
                {formData.parcelsNumberType}
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td className="text-center">2.</td>
              <td className="align-top-left">
                <strong>Case Details:</strong>
                <div style={{ marginTop: '2.5rem' }}>
                  <strong>Remarks, If Any:</strong>
                </div>
              </td>
              <td className="align-top-left font-content">
                <div>{formData.caseDetails}</div>
                <div style={{ marginTop: '1.8rem', borderTop: '1px dashed #ccc', paddingTop: '0.25rem' }}>
                  {formData.remarks}
                </div>
              </td>
              <td className="align-top-left">
                <strong>Exhibit/s Details:</strong>
              </td>
              <td className="align-top-left font-content whitespace-pre-wrap">
                {formData.exhibitsDetails}
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td className="text-center">3.</td>
              <td className="align-top-left">
                <strong>Authorized By:</strong>
              </td>
              <td className="align-top-left text-center">
                <div className="table-sig-box-large">{renderSignature('authorized')}</div>
                <div className="auth-designation-stamp">{formData.authorizedByRole}</div>
              </td>
              <td className="align-top-left">
                <div className="nested-handover-label">
                  <strong>Handover To (Sign) & Name:</strong>
                </div>
                <div className="nested-handover-label" style={{ marginTop: '2rem' }}>
                  <strong>Handover By (Sign) & Name:</strong>
                </div>
              </td>
              <td className="align-top-left">
                {/* Handover To rendering */}
                <div className="handover-cell-item">
                  <div className="handover-sig-min">{renderSignature('handoverTo')}</div>
                  <div className="handover-name-min">{formData.handoverToName || '..............................'}</div>
                </div>
                {/* Handover By rendering */}
                <div className="handover-cell-item" style={{ marginTop: '0.65rem' }}>
                  <div className="handover-sig-min">{renderSignature('handoverBy')}</div>
                  <div className="handover-name-min">{formData.handoverByName || '..............................'}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header Bar */}
      <header className="app-header">
        <div className="app-title-group">
          <Shield className="app-title-icon" size={28} />
          <div>
            <h1>Allotment Form Studio</h1>
            <p>Govt. Cyber Forensic Laboratory Panchkula (A4 Dual-Split Allotment Form)</p>
          </div>
        </div>
        <div className="app-actions">
          <button onClick={clearAll} className="btn btn-secondary">
            <Trash2 size={16} />
            Reset Form
          </button>
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={16} />
            Print Form (A4)
          </button>
        </div>
      </header>

      {/* Workspace Area */}
      <div className="app-workspace">
        {/* Left Control Panel Sidebar */}
        <aside className="app-sidebar">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <FileText size={18} />
              Details
            </button>
            <button
              className={`tab-btn ${activeTab === 'signatures' ? 'active' : ''}`}
              onClick={() => setActiveTab('signatures')}
            >
              <Signature size={18} />
              Signatures
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              Aesthetics
            </button>
          </div>

          <div className="sidebar-content">
            {/* TAB 1: DETAILS */}
            {activeTab === 'details' && (
              <>
                <div>
                  <h3 className="section-title">
                    <Sparkles size={16} />
                    Quick Preset Template
                  </h3>
                  <div className="preset-grid">
                    {TEMPLATES.map((tpl, idx) => (
                      <div
                        key={idx}
                        className="preset-card active"
                        onClick={() => applyTemplate(tpl)}
                      >
                        <div className="preset-name">{tpl.name}</div>
                        <div className="preset-desc">Panchkula Cyber Lab Standard Form</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="section-title">
                    <FileCheck size={16} />
                    Form Header Details
                  </h3>

                  <div className="form-group">
                    <label>Forensic Lab Name (Header)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.labName}
                      onChange={(e) => handleInputChange('labName', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label>Case Name/Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 20-CF-112"
                        value={formData.caseNumber}
                        onChange={(e) => handleInputChange('caseNumber', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.allotmentDate}
                        onChange={(e) => handleInputChange('allotmentDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Allotted To (Officer/SSO)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Karishma Saini"
                      value={formData.allottedTo}
                      onChange={(e) => handleInputChange('allottedTo', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Authorized Collector</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name / Designation"
                      value={formData.authorizedCollector}
                      onChange={(e) => handleInputChange('authorizedCollector', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="section-title">
                    <FileText size={16} />
                    Table Particulars & Details
                  </h3>

                  <div className="form-group">
                    <label>Recommended By (Name)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Inspector Anil Kumar"
                      value={formData.recommendedName}
                      onChange={(e) => handleInputChange('recommendedName', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Recommended By (Designation)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. SHO Sector 5"
                      value={formData.recommendedDesignation}
                      onChange={(e) => handleInputChange('recommendedDesignation', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Number / Type of Parcel/s</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2 Sealed Parcels"
                      value={formData.parcelsNumberType}
                      onChange={(e) => handleInputChange('parcelsNumberType', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Case Details</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Case description/context..."
                      value={formData.caseDetails}
                      onChange={(e) => handleInputChange('caseDetails', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Remarks, If Any</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Any additional remarks..."
                      value={formData.remarks}
                      onChange={(e) => handleInputChange('remarks', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Exhibit/s Details</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="List exhibits (e.g. 1. Seagate 1TB)"
                      value={formData.exhibitsDetails}
                      onChange={(e) => handleInputChange('exhibitsDetails', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Authorized By (Designation/Role)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.authorizedByRole}
                      onChange={(e) => handleInputChange('authorizedByRole', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Handover To (Name)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.handoverToName}
                      onChange={(e) => handleInputChange('handoverToName', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Handover By (Name)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.handoverByName}
                      onChange={(e) => handleInputChange('handoverByName', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: SIGNATURES */}
            {activeTab === 'signatures' && (
              <>
                <div>
                  <h3 className="section-title">
                    <Signature size={16} />
                    Digital Signature Panel
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Set up digital signatures for the form table cells. You can draw them on the canvas or type initials to render beautiful signatures instantly.
                  </p>
                </div>

                {/* Recommended Signature */}
                <div className="sig-control-block">
                  <div className="sig-header">
                    <span className="sig-name">1. Recommended By</span>
                    <div className="sig-type-toggle">
                      <button
                        className={`toggle-item ${sigTypes.recommended === 'draw' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('recommended', 'draw')}
                      >
                        Draw
                      </button>
                      <button
                        className={`toggle-item ${sigTypes.recommended === 'type' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('recommended', 'type')}
                      >
                        Type
                      </button>
                    </div>
                  </div>
                  {sigTypes.recommended === 'draw' ? (
                    <SignaturePad
                      label="Draw Recommended Sign"
                      initialValue={sigDrawings.recommended}
                      onChange={(dataUrl) => handleSigDrawingChange('recommended', dataUrl)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control signature-typed-input"
                      value={sigNames.recommended}
                      placeholder="Type initials / name"
                      onChange={(e) => handleSigNameChange('recommended', e.target.value)}
                    />
                  )}
                </div>

                {/* Authorized Signature */}
                <div className="sig-control-block">
                  <div className="sig-header">
                    <span className="sig-name">2. Authorized By ({formData.authorizedByRole})</span>
                    <div className="sig-type-toggle">
                      <button
                        className={`toggle-item ${sigTypes.authorized === 'draw' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('authorized', 'draw')}
                      >
                        Draw
                      </button>
                      <button
                        className={`toggle-item ${sigTypes.authorized === 'type' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('authorized', 'type')}
                      >
                        Type
                      </button>
                    </div>
                  </div>
                  {sigTypes.authorized === 'draw' ? (
                    <SignaturePad
                      label="Draw Authorized Sign"
                      initialValue={sigDrawings.authorized}
                      onChange={(dataUrl) => handleSigDrawingChange('authorized', dataUrl)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control signature-typed-input"
                      value={sigNames.authorized}
                      placeholder="Type initials / name"
                      onChange={(e) => handleSigNameChange('authorized', e.target.value)}
                    />
                  )}
                </div>

                {/* Handover To Signature */}
                <div className="sig-control-block">
                  <div className="sig-header">
                    <span className="sig-name">3. Handover To Signature</span>
                    <div className="sig-type-toggle">
                      <button
                        className={`toggle-item ${sigTypes.handoverTo === 'draw' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('handoverTo', 'draw')}
                      >
                        Draw
                      </button>
                      <button
                        className={`toggle-item ${sigTypes.handoverTo === 'type' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('handoverTo', 'type')}
                      >
                        Type
                      </button>
                    </div>
                  </div>
                  {sigTypes.handoverTo === 'draw' ? (
                    <SignaturePad
                      label="Draw Handover To Sign"
                      initialValue={sigDrawings.handoverTo}
                      onChange={(dataUrl) => handleSigDrawingChange('handoverTo', dataUrl)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control signature-typed-input"
                      value={sigNames.handoverTo}
                      placeholder="Type initials / name"
                      onChange={(e) => handleSigNameChange('handoverTo', e.target.value)}
                    />
                  )}
                </div>

                {/* Handover By Signature */}
                <div className="sig-control-block">
                  <div className="sig-header">
                    <span className="sig-name">4. Handover By Signature</span>
                    <div className="sig-type-toggle">
                      <button
                        className={`toggle-item ${sigTypes.handoverBy === 'draw' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('handoverBy', 'draw')}
                      >
                        Draw
                      </button>
                      <button
                        className={`toggle-item ${sigTypes.handoverBy === 'type' ? 'active' : ''}`}
                        onClick={() => handleSigTypeChange('handoverBy', 'type')}
                      >
                        Type
                      </button>
                    </div>
                  </div>
                  {sigTypes.handoverBy === 'draw' ? (
                    <SignaturePad
                      label="Draw Handover By Sign"
                      initialValue={sigDrawings.handoverBy}
                      onChange={(dataUrl) => handleSigDrawingChange('handoverBy', dataUrl)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control signature-typed-input"
                      value={sigNames.handoverBy}
                      placeholder="Type initials / name"
                      onChange={(e) => handleSigNameChange('handoverBy', e.target.value)}
                    />
                  )}
                </div>
              </>
            )}

            {/* TAB 3: AESTHETICS */}
            {activeTab === 'settings' && (
              <>
                <div>
                  <h3 className="section-title">
                    <Settings size={16} />
                    Document Visual System
                  </h3>

                  <div className="form-group">
                    <label>A4 Print Ink Palette</label>
                    <div className="theme-selector">
                      <button
                        className={`theme-color-dot ${theme === 'black' ? 'active' : ''}`}
                        style={{ backgroundColor: '#000000' }}
                        title="Plain Black (Perfect for photocopy)"
                        onClick={() => setTheme('black')}
                      />
                      <button
                        className={`theme-color-dot ${theme === 'blue' ? 'active' : ''}`}
                        style={{ backgroundColor: '#1e3a8a' }}
                        title="Deep Executive Blue"
                        onClick={() => setTheme('blue')}
                      />
                      <button
                        className={`theme-color-dot ${theme === 'green' ? 'active' : ''}`}
                        style={{ backgroundColor: '#064e3b' }}
                        title="Legal Green"
                        onClick={() => setTheme('green')}
                      />
                      <button
                        className={`theme-color-dot ${theme === 'charcoal' ? 'active' : ''}`}
                        style={{ backgroundColor: '#334155' }}
                        title="Charcoal Ink"
                        onClick={() => setTheme('charcoal')}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Typography Preset</label>
                    <div className="theme-selector font-selector-group">
                      <button
                        className={`btn btn-secondary text-xs ${fontStyle === 'serif' ? 'active' : ''}`}
                        onClick={() => setFontStyle('serif')}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Serif Style
                      </button>
                      <button
                        className={`btn btn-secondary text-xs ${fontStyle === 'sans' ? 'active' : ''}`}
                        onClick={() => setFontStyle('sans')}
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        Sans-Serif
                      </button>
                      <button
                        className={`btn btn-secondary text-xs ${fontStyle === 'mono' ? 'active' : ''}`}
                        onClick={() => setFontStyle('mono')}
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        Monospace
                      </button>
                    </div>
                  </div>

                  <div className="form-group mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCutGuide}
                        onChange={(e) => setShowCutGuide(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                      />
                      Show Middle Paper Split Line
                    </label>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 mt-6">
                  <h4 className="font-semibold text-sm text-white mb-2 flex items-center gap-1">
                    <HelpCircle size={15} /> Lab Standards Note
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
                    <li>Prints two identical forms vertically on one A4 sheet to fulfill office + officer record archiving.</li>
                    <li>Double-lined borders around each form ensure clear bounding box boundaries.</li>
                    <li>For a high-quality physical document, select <strong>A4 Size</strong> and set Margins to <strong>"None"</strong> in the standard print options.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Right Live Preview Workbench */}
        <main className="app-preview-bench">
          {/* Zoom Buttons */}
          <div className="zoom-controls">
            <button onClick={() => setZoom(z => Math.max(50, z - 5))} className="zoom-btn" title="Zoom Out">
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-semibold px-2 py-0.5 select-none">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(120, z + 5))} className="zoom-btn" title="Zoom In">
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setZoom(80)} className="zoom-btn" title="Reset Zoom">
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Dynamic scaling preview window */}
          <div
            className={`a4-sheet font-style-${fontStyle}`}
            style={{
              transform: `scale(${zoom / 100})`,
              '--paper-theme-primary': colors.primary,
              '--paper-theme-secondary': colors.secondary,
              '--paper-border': colors.border
            }}
          >
            {/* Double Border Frame around the entire paper */}
            <div className="paper-outer-frame">
              {/* TOP FORM HALF */}
              <div className="form-copy-box">
                {renderSingleForm()}
              </div>

              {/* SPLIT CUT GUIDE */}
              {showCutGuide && (
                <div className="sheet-splitter" />
              )}

              {/* BOTTOM FORM HALF */}
              <div className="form-copy-box">
                {renderSingleForm()}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Status Toasts */}
      {toast.show && (
        <div className="toast">
          <CheckCircle size={16} />
          {toast.message}
        </div>
      )}
    </div>
  );
}
