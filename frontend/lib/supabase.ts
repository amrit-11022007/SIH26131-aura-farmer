import { createClient } from '@supabase/supabase-js';
import { DiagnosisResult, Field, Farm, AlertItem, Hotspot } from '@/types';
import { DEMO_FARMS, DEMO_FIELDS, DEMO_DIAGNOSES, DEMO_PEST_REPORTS, DEMO_ALERTS, DEMO_HOTSPOTS } from './demo-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper data access methods with automatic Supabase / In-Memory fallback

export async function getFarms(userId?: string): Promise<Farm[]> {
  if (!supabase) return DEMO_FARMS;
  try {
    let query = supabase.from('farms').select('*');
    if (userId) query = query.eq('owner_id', userId);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return DEMO_FARMS;
    return data as Farm[];
  } catch {
    return DEMO_FARMS;
  }
}

export async function getFields(farmId?: string): Promise<Field[]> {
  if (!supabase) return DEMO_FIELDS;
  try {
    let query = supabase.from('fields').select('*');
    if (farmId) query = query.eq('farm_id', farmId);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return DEMO_FIELDS;
    return data as Field[];
  } catch {
    return DEMO_FIELDS;
  }
}

export async function getDiagnoses(): Promise<DiagnosisResult[]> {
  if (!supabase) return DEMO_DIAGNOSES;
  try {
    const { data, error } = await supabase.from('diagnoses').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return DEMO_DIAGNOSES;
    return data as DiagnosisResult[];
  } catch {
    return DEMO_DIAGNOSES;
  }
}

export async function saveDiagnosis(diagnosis: Partial<DiagnosisResult>): Promise<DiagnosisResult> {
  const newDiag: DiagnosisResult = {
    diagnosis_id: diagnosis.diagnosis_id || `diag-${Date.now()}`,
    predicted_disease: diagnosis.predicted_disease || "Healthy Crop",
    confidence: diagnosis.confidence || 0.92,
    severity: diagnosis.severity || "LOW",
    risk_score: diagnosis.risk_score || 15,
    status: diagnosis.status || "AI_PREDICTED",
    image_url: diagnosis.image_url || "/uploads/sample_leaf.jpg",
    weather_context: diagnosis.weather_context,
    risk_factors: diagnosis.risk_factors,
    reasons: diagnosis.reasons || ["Normal leaf pigmentation", "Favorable weather"],
    advisory: diagnosis.advisory,
    disclaimer: diagnosis.disclaimer || "AI prediction based on MobileNetV2 architecture. Consult an extension expert for confirmation.",
  };

  if (supabase) {
    try {
      await supabase.from('diagnoses').insert([
        {
          id: newDiag.diagnosis_id,
          predicted_disease: newDiag.predicted_disease,
          confidence: newDiag.confidence,
          severity: newDiag.severity,
          risk_score: newDiag.risk_score,
          status: newDiag.status,
          image_url: newDiag.image_url,
          details: newDiag,
          created_at: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.warn("Failed to persist diagnosis to Supabase:", err);
    }
  }

  // Also prepend to local demo list for instantaneous UI feedback
  DEMO_DIAGNOSES.unshift(newDiag);
  return newDiag;
}

export async function getAlerts(): Promise<AlertItem[]> {
  if (!supabase) return DEMO_ALERTS;
  try {
    const { data, error } = await supabase.from('alerts').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return DEMO_ALERTS;
    return data as AlertItem[];
  } catch {
    return DEMO_ALERTS;
  }
}

export async function getHotspots(): Promise<Hotspot[]> {
  if (!supabase) return DEMO_HOTSPOTS;
  try {
    const { data, error } = await supabase.from('hotspots').select('*');
    if (error || !data || data.length === 0) return DEMO_HOTSPOTS;
    return data as Hotspot[];
  } catch {
    return DEMO_HOTSPOTS;
  }
}
