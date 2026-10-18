package civicconnect_backend.entity;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Category cannot be blank")
    private String category;

    @NotBlank(message = "Location cannot be blank")
    private String location;

    @NotBlank(message = "Priority cannot be blank")
    private String priority;

    @NotBlank(message = "Status cannot be blank")
    private String status;

    @NotBlank(message = "Reported by cannot be blank")
    private String reportedBy;

    private java.time.LocalDateTime createdAt;
    private java.time.LocalDateTime updatedAt;

    public Issue() {
}
    public Long getId() {
    return id;
}

    public void setId(Long id) {
    this.id = id;
}   
    public String getTitle() {
    return title;
}

    public void setTitle(String title) {
    this.title = title;
}
    public String getDescription() {
    return description;
}

    public void setDescription(String description) {
    this.description = description;
}
    public String getCategory() {
    return category;
}

    public void setCategory(String category) {
    this.category = category;
}
    public String getLocation() {
    return location;
}

    public void setLocation(String location) {
    this.location = location;
}
public String getPriority() {
    return priority;
}

public void setPriority(String priority) {
    this.priority = priority;
}
public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
public String getReportedBy() {
    return reportedBy;
}

public void setReportedBy(String reportedBy) {
    this.reportedBy = reportedBy;
}
public java.time.LocalDateTime getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(java.time.LocalDateTime createdAt) {
    this.createdAt = createdAt;
}
public java.time.LocalDateTime getUpdatedAt() {
    return updatedAt;
}

public void setUpdatedAt(java.time.LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
}
@PrePersist
protected void onCreate() {
    createdAt = java.time.LocalDateTime.now();
    updatedAt = java.time.LocalDateTime.now();
}

@PreUpdate
protected void onUpdate() {
    updatedAt = java.time.LocalDateTime.now();
}

}