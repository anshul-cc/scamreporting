import { Shield, Search, AlertTriangle, CheckCircle } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Trust<span className="text-primary">Trace</span>
          </h1>
          <p className={styles.subtitle}>
            Aggregate, normalize, and verify malicious crypto addresses.
            Protect yourself and the community.
          </p>

          <div className={`${styles.searchBox} glass-panel`}>
            <Search className="w-5 h-5 text-secondary" />
            <input
              type="text"
              placeholder="Search by address (0x...) or domain"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={`${styles.statCard} glass-panel`}>
          <Shield className="w-8 h-8 text-primary" />
          <div className={styles.statInfo}>
            <h3>24,592</h3>
            <p className="text-secondary">Scams Reported</p>
          </div>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <CheckCircle className="w-8 h-8 text-success" />
          <div className={styles.statInfo}>
            <h3>$12.5M</h3>
            <p className="text-secondary">Assets Saved</p>
          </div>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <AlertTriangle className="w-8 h-8 text-danger" />
          <div className={styles.statInfo}>
            <h3>142</h3>
            <p className="text-secondary">Active Threats</p>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className={styles.recentReports}>
        <h2 className={styles.sectionTitle}>Recent Flags</h2>
        <div className={styles.reportGrid}>
          {/* Mock Data */}
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${styles.reportCard} glass-panel`}>
              <div className={styles.reportHeader}>
                <span className={`${styles.riskBadge} text-danger`}>High Risk</span>
                <span className="text-secondary text-sm">2 mins ago</span>
              </div>
              <div className="mono text-sm mb-2 opacity-80">0x3f5...9a21</div>
              <p className="text-sm text-secondary">Phishing link detected in Discord DM.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
