/**
 * Database Integrity Verification Script
 * 
 * This script connects to the Supabase database and verifies that the 
 * "Core Leadership Principles" section data matches what's displayed in the UI
 */

// Note: You'll need to install the Supabase client: npm install @supabase/supabase-js
// and set up your environment variables for database connection

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Expected data based on the screenshot and migration files
const EXPECTED_DATA = {
  sectionTitle: "Core Leadership Principles",
  duration: 12,
  mainText: "Effective leadership is built on timeless principles that transcend industries and cultures. These principles form the foundation for building trust, inspiring others, and achieving sustainable success.",
  keyPoints: [
    "Lead by example - your actions speak louder than words",
    "Integrity builds trust and credibility with your team",
    "Vision provides direction and purpose for your organization", 
    "Empathy enables you to connect with and understand others"
  ],
  objectives: [
    "Understand the fundamental principles of effective leadership",
    "Learn how to build trust and credibility as a leader",
    "Develop your personal leadership philosophy"
  ]
};

async function verifyDatabaseIntegrity() {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Supabase credentials not found in environment variables');
      console.log('Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY');
      return false;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔍 Connecting to database...');

    // Query the Foundations of Leadership module
    const { data: modules, error } = await supabase
      .from('learning_modules')
      .select('id, title, content_sections')
      .eq('title', 'Foundations of Leadership');

    if (error) {
      console.error('❌ Database query error:', error.message);
      return false;
    }

    if (!modules || modules.length === 0) {
      console.error('❌ No "Foundations of Leadership" module found in database');
      return false;
    }

    const module = modules[0];
    console.log('✅ Found module:', module.title);

    // Parse content sections
    let contentSections;
    try {
      contentSections = typeof module.content_sections === 'string' 
        ? JSON.parse(module.content_sections) 
        : module.content_sections;
    } catch (parseError) {
      console.error('❌ Failed to parse content_sections:', parseError.message);
      return false;
    }

    if (!contentSections || !Array.isArray(contentSections)) {
      console.error('❌ content_sections is not a valid array');
      return false;
    }

    // Find the Core Leadership Principles section
    const coreLeadershipSection = contentSections.find(section => 
      section.title === 'Core Leadership Principles'
    );

    if (!coreLeadershipSection) {
      console.error('❌ Core Leadership Principles section not found');
      console.log('Available sections:', contentSections.map(s => s.title));
      return false;
    }

    console.log('✅ Found Core Leadership Principles section');

    // Verify each field
    const verifications = [];
    
    // Section title
    verifications.push({
      field: 'Section Title',
      expected: EXPECTED_DATA.sectionTitle,
      actual: coreLeadershipSection.title,
      matches: coreLeadershipSection.title === EXPECTED_DATA.sectionTitle
    });

    // Duration
    verifications.push({
      field: 'Duration',
      expected: EXPECTED_DATA.duration,
      actual: coreLeadershipSection.duration_minutes,
      matches: coreLeadershipSection.duration_minutes === EXPECTED_DATA.duration
    });

    // Main text
    verifications.push({
      field: 'Main Text',
      expected: EXPECTED_DATA.mainText,
      actual: coreLeadershipSection.content?.text,
      matches: coreLeadershipSection.content?.text === EXPECTED_DATA.mainText
    });

    // Key points
    const actualKeyPoints = coreLeadershipSection.content?.key_points || [];
    verifications.push({
      field: 'Key Points Count',
      expected: EXPECTED_DATA.keyPoints.length,
      actual: actualKeyPoints.length,
      matches: actualKeyPoints.length === EXPECTED_DATA.keyPoints.length
    });

    // Individual key points
    EXPECTED_DATA.keyPoints.forEach((expectedPoint, index) => {
      verifications.push({
        field: `Key Point ${index + 1}`,
        expected: expectedPoint,
        actual: actualKeyPoints[index],
        matches: actualKeyPoints[index] === expectedPoint
      });
    });

    // Learning objectives
    const actualObjectives = coreLeadershipSection.content?.objectives || [];
    verifications.push({
      field: 'Learning Objectives Count',
      expected: EXPECTED_DATA.objectives.length,
      actual: actualObjectives.length,
      matches: actualObjectives.length === EXPECTED_DATA.objectives.length
    });

    // Individual objectives
    EXPECTED_DATA.objectives.forEach((expectedObjective, index) => {
      verifications.push({
        field: `Objective ${index + 1}`,
        expected: expectedObjective,
        actual: actualObjectives[index],
        matches: actualObjectives[index] === expectedObjective
      });
    });

    // Report results
    console.log('\n📊 VERIFICATION RESULTS:');
    console.log('='.repeat(80));
    
    let allMatch = true;
    verifications.forEach(({ field, expected, actual, matches }) => {
      const status = matches ? '✅' : '❌';
      console.log(`${status} ${field}: ${matches ? 'MATCHES' : 'MISMATCH'}`);
      
      if (!matches) {
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
        allMatch = false;
      }
    });

    console.log('='.repeat(80));
    
    if (allMatch) {
      console.log('🎉 ALL DATA MATCHES! UI is displaying correct database content.');
      console.log('✅ Data integrity verification PASSED');
    } else {
      console.log('⚠️  Some data mismatches found. Please review the differences above.');
      console.log('❌ Data integrity verification FAILED'); 
    }

    return allMatch;

  } catch (error) {
    console.error('❌ Verification failed with error:', error.message);
    return false;
  }
}

// Run verification if this script is executed directly
// Always run for now since import.meta detection is tricky
if (true) {
  console.log('🚀 Starting database integrity verification...\n');
  
  verifyDatabaseIntegrity()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { verifyDatabaseIntegrity, EXPECTED_DATA };
