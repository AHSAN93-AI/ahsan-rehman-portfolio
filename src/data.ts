export type Cat = "Vision" | "Automation" | "ML" | "Agents";
export interface Project { slug: string; title: string; cat: Cat; featured: boolean; summary: string; tags: string[] }
export const cats: Cat[] = ["Vision", "Automation", "ML", "Agents"];
const p = (slug: string, title: string, cat: Cat, featured: boolean, summary: string, tags: string[]): Project => ({ slug, title, cat, featured, summary, tags });
// Featured = Ahsan's own work. Others are "Concept / Lab" cards. TODO(Ahsan): confirm / replace the non-featured items.
export const projects: Project[] = [
  p("parking-violation-occupancy-monitoring", "Parking Violation & Occupancy Monitoring System", "Vision", true, "Real-time vehicle detection and tracking with a live dashboard, rule-based violation alerts and evidence capture.", ["YOLOv8", "ByteTrack", "OpenCV", "Dashboard"]),
  p("car-damage-detection", "Car Damage Detection", "Vision", true, "A computer vision model that detects vehicle damage, integrated into a Python ML workflow.", ["YOLO", "Python", "OpenCV"]),
  p("weapon-alert-system", "Weapon Alert System", "Vision", true, "Real-time weapon detection with rule-based alerts and evidence capture.", ["YOLO", "Alerting", "Evidence"]),
  p("inventory-tracking-automation", "Inventory Tracking Automation System", "Automation", true, "An automation pipeline that tracks inventory on scheduled triggers and connects AI models with business systems.", ["Workflow", "Scheduled triggers", "Python"]),
  p("ai-resume-screening-tool", "AI Resume Screening Tool", "ML", true, "A Python ML model integrated into an automated resume screening workflow.", ["Python", "Scikit-learn", "Pandas"]),
  p("dental-clinic-ai-agent", "Dental Clinic AI Agent", "Agents", true, "An LLM-powered agent with a RAG pipeline that retrieves clinic knowledge and takes actions.", ["LangChain", "RAG", "LLM"]),
  p("fraud-risk-scoring-engine", "Fraud Risk Scoring Engine", "Automation", false, "Real-time transaction risk scoring inside an automated pipeline.", ["Automation", "Risk scoring"]),
  p("aws-cost-watchdog", "AWS Cost Watchdog", "Automation", false, "Finds orphaned cloud resources and sends cost reports to Slack, email and Sheets.", ["Automation", "Alerts"]),
  p("ai-ticket-triage", "AI Ticket Triage", "Automation", false, "Multi-model ticket classification backed by a knowledge base.", ["Classification", "Knowledge base"]),
  p("ai-voice-receptionist", "AI Voice Receptionist", "Agents", false, "A 24/7 voice agent that books appointments and sends SMS confirmations.", ["Voice", "Agent", "SMS"]),
  p("multi-agent-qa-system", "Multi-Agent Q&A System", "Agents", false, "Modular multi-agent system for multi-step reasoning with FAISS and RAG.", ["Agents", "FAISS", "RAG"]),
  p("rt-detr-object-detection", "RT-DETRv2 Object Detection", "Vision", false, "Transformer-based real-time object detection demo.", ["RT-DETRv2", "PyTorch"]),
  p("rice-grain-analysis", "Rice Grain Analysis", "Vision", false, "Detect, count and measure grains with OpenCV.", ["OpenCV", "Segmentation"]),
  p("spam-sms-classifier", "Spam SMS Classifier", "ML", false, "End-to-end TF-IDF and Naive Bayes text classification pipeline.", ["TF-IDF", "Naive Bayes"]),
];
export const flows: Record<Cat, string[]> = {
  Vision: ["Video stream", "Detect", "Track", "Rules", "Alert + evidence"],
  Automation: ["Trigger", "Ingest data", "AI step", "Business system", "Report / notify"],
  ML: ["Raw data", "Features", "Model", "Evaluate", "Integrate"],
  Agents: ["Request", "Retrieve (RAG)", "Reason", "Act", "Respond"],
};
export const story: Record<Cat, [string, string, string]> = {
  Vision: ["Manual monitoring is slow and easy to miss.", "A detection model feeds a tracker and a rule engine that raises alerts.", "A practical, production-style pipeline that turns video into reviewable events."],
  Automation: ["Repetitive manual steps slow teams down.", "Scheduled triggers connect AI models and business systems end to end.", "Less manual work and a workflow that runs on its own."],
  ML: ["Decisions depend on data nobody has time to sift.", "A Python ML model is trained, evaluated and wired into an automated workflow.", "A model that works inside the process, not in a notebook."],
  Agents: ["Knowledge is scattered and answering takes time.", "An LLM agent retrieves context through RAG, reasons and takes actions.", "An agent that answers from your knowledge and gets things done."],
};
export const services = [
  { t: "Computer Vision Solutions", d: "Real-time detection, tracking and alerting systems.", e: ["Parking Violation & Occupancy Monitoring System", "Car Damage Detection", "Weapon Alert System"] },
  { t: "Workflow and Process Automation", d: "Automation pipelines that connect AI models and business systems.", e: ["Inventory Tracking Automation System"] },
  { t: "Machine Learning Integration", d: "Python ML models integrated into automated workflows.", e: ["AI Resume Screening Tool", "Car Damage Detection"] },
  { t: "Monitoring and Alerting Systems", d: "Live dashboards, rule-based alerts and evidence capture.", e: ["Parking Violation & Occupancy Monitoring System", "Weapon Alert System", "Inventory Tracking Automation System"] },
  { t: "AI Agents", d: "LLM-powered agents and RAG pipelines that reason, retrieve knowledge and take actions.", e: ["Dental Clinic AI Agent"] },
];
export const skills: [string, string[]][] = [
  ["Automation", ["Business Process Automation", "Workflow Orchestration", "Scheduled Triggers"]],
  ["Languages", ["Python"]],
  ["Computer Vision", ["OpenCV", "YOLO (v8)", "ByteTrack"]],
  ["AI Agents", ["LangChain", "RAG"]],
  ["ML & Data Science", ["Scikit-learn", "TensorFlow", "Keras", "Pandas"]],
];
export const steps = ["Discover the workflow", "Prototype the model or agent", "Integrate with your systems", "Deploy, monitor, iterate"];
