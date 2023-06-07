package com.JPA.Entities.CompositBeans;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
//import com.JPA.Entities.CompositKeyClasses.BlockedAuthorID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BLOCKED_AUTHORS")
@Entity
//@IdClass(BlockedAuthorID.class)
public class BlockedAuthors {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "ID", nullable = false, updatable = false, unique = true)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long authorNameID;
//    @Id
    @OneToOne
    @JoinColumn(name = "PUBLISHER_ID", referencedColumnName = "PUBLISHER_ID")
    private Publisher authorId;
//    @Id
    @ManyToOne
    @JoinColumn(name = "ADMIN_ID", referencedColumnName = "USER_ID")
    private User AdminId;

    public BlockedAuthors(Publisher authorId, User adminId) {
        this.authorId = authorId;
        AdminId = adminId;
    }
}
