export interface TriggerCondition {
  label: string;
  value: string;
}

export interface CardData {
  id: string;
  type: string;
  name: string;
  timing: string;
  severity: string;
  percentage: number;
  location: string;
  description: string;
  triggerConditions: TriggerCondition[];
  recommendation: string[];
}
