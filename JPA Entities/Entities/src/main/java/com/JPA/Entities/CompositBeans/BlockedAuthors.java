package com.JPA.Entities.CompositBeans;
import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositKeyClasses.BlockedAuthorID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BLOCKED_AUTHORS")
@Entity
@IdClass(BlockedAuthorID.class)
public class BlockedAuthors {
    @Id
    @OneToOne
    @JoinColumn(name = "PUBLISHER_ID", referencedColumnName = "PUBLISHER_ID")
    private Publisher authorId;
    @Id
    @ManyToOne
    @JoinColumn(name = "ADMIN_ID", referencedColumnName = "ADMIN_ID")
    private Admin AdminId;
}
